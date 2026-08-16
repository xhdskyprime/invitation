import defaultConfig from './data/config.json' with { type: 'json' };
import defaultWishes from './data/wishes.json' with { type: 'json' };

// In-memory rate limiting stores for Worker runtime
const failedLoginAttempts = new Map(); // ip -> { count: number, resetAt: number }
const wishesSubmissions = new Map();   // ip -> { count: number, resetAt: number }

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         '127.0.0.1';
}

function checkRateLimit(store, ip, maxAllowed, windowMs) {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAllowed - 1 };
  }

  if (record.count >= maxAllowed) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAllowed - record.count };
}

function recordFailedLogin(ip) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes lockout
  const record = failedLoginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    failedLoginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    record.count += 1;
  }
}

function resetFailedLogin(ip) {
  failedLoginAttempts.delete(ip);
}

function getFailedLoginStatus(ip) {
  const now = Date.now();
  const record = failedLoginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    return { blocked: false, count: 0 };
  }
  if (record.count >= 5) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { blocked: true, retryAfterSec, count: record.count };
  }
  return { blocked: false, count: record.count };
}

async function generateSessionToken(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password + ':invitation_secret_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [k, v] = cookie.trim().split('=');
    if (k === name) return v;
  }
  return null;
}

async function checkAuth(request, env) {
  const correctPassword = env.ADMIN_PASSWORD || '262626';

  // 1. Check header
  const providedPassword = request.headers.get('X-Admin-Password');
  if (providedPassword && providedPassword === correctPassword) {
    return true;
  }

  // 2. Check session cookie
  const sessionCookie = getCookie(request, 'admin_session');
  if (sessionCookie) {
    const expectedToken = await generateSessionToken(correctPassword);
    if (sessionCookie === expectedToken) {
      return true;
    }
  }

  return false;
}

function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: 'Unauthorized: Invalid password' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password'
    }
  });
}

// Dedicated server-rendered PIN Login page for /admin & /tamu
function renderAdminLoginPage(targetTitle = 'Admin Panel') {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - ${targetTitle}</title>
  <link rel="icon" type="image/png" href="/logo%20lutpi%20bg.png">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #113468;
      --primary-hover: #0c274f;
      --gold: #d4af37;
      --bg: #0b192c;
      --card-bg: rgba(255, 255, 255, 0.98);
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --danger: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    body {
      background: var(--bg);
      background-image: radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent 400px),
                        radial-gradient(circle at bottom left, rgba(17, 52, 104, 0.3), transparent 400px);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-card {
      background: var(--card-bg);
      border-radius: 20px;
      padding: 36px 28px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
      text-align: center;
    }
    .lock-icon-wrap {
      width: 64px;
      height: 64px;
      background: #eff6ff;
      border: 2px solid #dbeafe;
      border-radius: 50%;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
    }
    .lock-icon-wrap svg { width: 30px; height: 30px; }
    h1 { font-size: 1.25rem; font-weight: 800; color: var(--primary); margin-bottom: 6px; }
    p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 22px; line-height: 1.4; }
    .pin-input {
      width: 100%;
      padding: 14px;
      font-size: 1.3rem;
      letter-spacing: 6px;
      text-align: center;
      border: 2px solid var(--border);
      border-radius: 12px;
      margin-bottom: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .pin-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(17, 52, 104, 0.15);
    }
    .btn-submit {
      width: 100%;
      padding: 14px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }
    .btn-submit:hover { background: var(--primary-hover); }
    .btn-submit:active { transform: scale(0.98); }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .error-msg {
      color: var(--danger);
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 12px;
      display: none;
    }
    .back-home {
      margin-top: 20px;
      display: inline-block;
      font-size: 0.8rem;
      color: var(--text-muted);
      text-decoration: none;
    }
    .back-home:hover { color: var(--primary); text-decoration: underline; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="lock-icon-wrap">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
      </svg>
    </div>
    <h1>${targetTitle}</h1>
    <p>Masukkan 6 digit PIN Admin untuk mengakses dashboard</p>

    <form id="loginForm" onsubmit="handleLogin(event)">
      <input type="password" id="pinInput" class="pin-input" maxlength="6" inputmode="numeric" placeholder="••••••" autofocus required>
      <button type="submit" id="btnSubmit" class="btn-submit">Buka Akses</button>
      <div id="errorMsg" class="error-msg"></div>
    </form>
    <a href="/" class="back-home">← Kembali ke Halaman Undangan</a>
  </div>

  <script>
    async function handleLogin(e) {
      e.preventDefault();
      const pin = document.getElementById('pinInput').value.trim();
      const btn = document.getElementById('btnSubmit');
      const err = document.getElementById('errorMsg');

      if (!pin) return;
      btn.disabled = true;
      btn.textContent = 'Memverifikasi...';
      err.style.display = 'none';

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pin })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          localStorage.setItem('admin_password', pin);
          window.location.reload();
        } else {
          err.style.display = 'block';
          err.textContent = data.error || 'PIN yang Anda masukkan salah!';
          document.getElementById('pinInput').value = '';
          document.getElementById('pinInput').focus();
        }
      } catch (errExp) {
        err.style.display = 'block';
        err.textContent = 'Gagal menghubungi server.';
      } finally {
        btn.disabled = false;
        btn.textContent = 'Buka Akses';
      }
    }
  </script>
</body>
</html>`;
}

// Audio URL & Base64 sanitization helper
function validateAudioPayload(audio) {
  if (!audio) return null;
  if (typeof audio !== 'string') return null;
  const trimmed = audio.trim();

  // Max 600 KB string length for audio payload
  if (trimmed.length > 600000) return null;

  // Allowed Base64 audio MIME types
  const base64AudioRegex = /^data:audio\/(webm|ogg|wav|mp4|mpeg|aac|m4a);base64,[A-Za-z0-9+/=]+$/;
  if (base64AudioRegex.test(trimmed)) {
    return trimmed;
  }

  // Allowed HTTPS safe audio URL
  const httpsUrlRegex = /^https:\/\/[a-zA-Z0-9.-]+\/.*\.(mp3|m4a|wav|ogg|webm)$/i;
  if (httpsUrlRegex.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientIp = getClientIp(request);

    // ==========================================
    // CORS preflight requests
    // ==========================================
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password'
        }
      });
    }

    // ==========================================
    // API: /api/admin/login (Session Cookie creation)
    // ==========================================
    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      const lockStatus = getFailedLoginStatus(clientIp);
      if (lockStatus.blocked) {
        return new Response(JSON.stringify({ 
          error: `Terlalu banyak percobaan salah. Silakan coba lagi dalam ${lockStatus.retryAfterSec} detik.` 
        }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const body = await request.json();
        const correctPassword = env.ADMIN_PASSWORD || '262626';

        if (body.password !== correctPassword) {
          recordFailedLogin(clientIp);
          // Artificial delay on failed password
          await new Promise(resolve => setTimeout(resolve, 500));
          return unauthorizedResponse();
        }

        // Success - reset failed attempts & issue session cookie
        resetFailedLogin(clientIp);
        const sessionToken = await generateSessionToken(correctPassword);

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Bad Request' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ==========================================
    // API: /api/admin/logout
    // ==========================================
    if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Max-Age=0',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ==========================================
    // API: /api/admin/verify
    // ==========================================
    if (url.pathname === '/api/admin/verify') {
      const lockStatus = getFailedLoginStatus(clientIp);
      if (lockStatus.blocked) {
        return new Response(JSON.stringify({ 
          error: `Terlalu banyak percobaan salah. Silakan coba lagi dalam ${lockStatus.retryAfterSec} detik.` 
        }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const isAuthed = await checkAuth(request, env);
      if (!isAuthed) {
        recordFailedLogin(clientIp);
        await new Promise(resolve => setTimeout(resolve, 500));
        return unauthorizedResponse();
      }

      resetFailedLogin(clientIp);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ==========================================
    // API: /api/config
    // ==========================================
    if (url.pathname === '/api/config') {
      if (request.method === 'GET') {
        const isAuthed = await checkAuth(request, env);
        const stored = await env.INVITATION_DB.get('config');
        const config = stored ? JSON.parse(stored) : defaultConfig;

        // VULN-01 FIX: Never expose guestList (names & phone numbers) to unauthenticated public requests!
        if (!isAuthed) {
          const publicConfig = JSON.parse(JSON.stringify(config));
          delete publicConfig.guestList;
          return new Response(JSON.stringify(publicConfig, null, 2), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
              'Cache-Control': 'no-store, max-age=0'
            }
          });
        }

        // Authenticated Admin receives full config including guestList
        return new Response(JSON.stringify(config, null, 2), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
            'Cache-Control': 'no-store, max-age=0'
          }
        });
      }

      if (request.method === 'POST') {
        const isAuthed = await checkAuth(request, env);
        if (!isAuthed) return unauthorizedResponse();

        try {
          const body = await request.json();
          await env.INVITATION_DB.put('config', JSON.stringify(body, null, 2));
          return new Response(JSON.stringify({ success: true }), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    // ==========================================
    // API: /api/wishes
    // ==========================================
    if (url.pathname === '/api/wishes') {
      if (request.method === 'GET') {
        const stored = await env.INVITATION_DB.get('wishes');
        const wishes = stored ? JSON.parse(stored) : defaultWishes;
        return new Response(JSON.stringify(wishes, null, 2), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, max-age=0'
          }
        });
      }

      if (request.method === 'POST') {
        // VULN-05: Rate limit wishes submission per IP (max 5 per 3 minutes)
        const rateCheck = checkRateLimit(wishesSubmissions, clientIp, 5, 3 * 60 * 1000);
        if (!rateCheck.allowed) {
          return new Response(JSON.stringify({ 
            error: `Terlalu banyak mengirim ucapan. Silakan tunggu ${rateCheck.retryAfterSec} detik.` 
          }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          // VULN-05: Enforce max payload size check (~1 MB max body size)
          const contentLength = parseInt(request.headers.get('Content-Length') || '0', 10);
          if (contentLength > 1048576) {
            return new Response(JSON.stringify({ error: 'Ukuran payload melebihi batas (maks 1MB)' }), {
              status: 413,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          const body = await request.json();

          // Input Validation & Sanitization
          const cleanName = (typeof body.name === 'string' ? body.name.trim() : '').slice(0, 100);
          const cleanText = (typeof body.text === 'string' ? body.text.trim() : '').slice(0, 1000);
          
          if (!cleanName || !cleanText) {
            return new Response(JSON.stringify({ error: 'Nama dan ucapan wajib diisi' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          const cleanStatus = ['Hadir', 'Tidak Hadir', 'Ragu-ragu'].includes(body.status) ? body.status : 'Hadir';
          const cleanCount = Math.min(Math.max(parseInt(body.count, 10) || 1, 1), 10);
          
          // VULN-03 & VULN-05: Validate audio payload MIME & size
          const cleanAudio = validateAudioPayload(body.audio);

          let wishes = [];
          const stored = await env.INVITATION_DB.get('wishes');
          if (stored) {
            wishes = JSON.parse(stored);
          } else {
            wishes = [...defaultWishes];
          }

          const newWish = {
            id: Date.now(),
            name: cleanName,
            status: cleanStatus,
            count: cleanCount,
            text: cleanText,
            audio: cleanAudio,
            date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' })
          };

          wishes.unshift(newWish);

          // VULN-05: Prevent KV storage explosion by keeping max 200 newest wishes
          if (wishes.length > 200) {
            wishes = wishes.slice(0, 200);
          }

          await env.INVITATION_DB.put('wishes', JSON.stringify(wishes, null, 2));

          return new Response(JSON.stringify(newWish), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Gagal menyimpan ucapan' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      if (request.method === 'DELETE') {
        const isAuthed = await checkAuth(request, env);
        if (!isAuthed) return unauthorizedResponse();

        await env.INVITATION_DB.put('wishes', JSON.stringify([], null, 2));
        return new Response(JSON.stringify({ success: true }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // ==========================================
    // VULN-02: Server-Side Protection for /admin and /tamu
    // ==========================================
    const isAdminRoute = url.pathname === '/admin' || url.pathname === '/admin/' || url.pathname === '/admin.html';
    const isTamuRoute = url.pathname === '/tamu' || url.pathname === '/tamu/' || url.pathname === '/tamu.html';

    if (isAdminRoute || isTamuRoute) {
      const isAuthed = await checkAuth(request, env);
      if (!isAuthed) {
        const title = isAdminRoute ? 'Admin Panel Undangan' : 'Buku Tamu Undangan';
        return new Response(renderAdminLoginPage(title), {
          headers: { 
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0'
          }
        });
      }

      // User is authenticated -> serve the actual HTML
      const targetFile = isAdminRoute ? '/admin.html' : '/tamu.html';
      const newUrl = new URL(request.url);
      newUrl.pathname = targetFile;
      return env.ASSETS.fetch(new Request(newUrl, request));
    }

    // ==========================================
    // Fallback: Serve static assets via Cloudflare Assets
    // ==========================================
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('Not Found', { status: 404 });
  }
};
