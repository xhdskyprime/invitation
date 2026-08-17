// Test script to verify all 5 vulnerability remediations
import worker from './index.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
  }
}

// Mock Cloudflare Environment
const mockKv = new Map();
const mockEnv = {
  ADMIN_PASSWORD: '262626',
  INVITATION_DB: {
    get: async (key) => mockKv.get(key) || null,
    put: async (key, val) => { mockKv.set(key, val); }
  },
  ASSETS: {
    fetch: async (req) => new Response(`<html><body>MOCK ASSET CONTENT FOR ${new URL(req.url).pathname}</body></html>`, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
};

// Seed KV with initial config containing guestList
mockKv.set('config', JSON.stringify({
  general: { coupleNames: 'Lutfi & Firdha' },
  guestList: [
    { id: 1, name: 'Budi Santoso', phone: '08123456789' },
    { id: 2, name: 'Siti Rahma', phone: '08987654321' }
  ]
}));

async function runTests() {
  console.log('--- STARTING SECURITY VERIFICATION TESTS ---\n');

  // TEST 1: VULN-01 - GET /api/config (Public Request)
  {
    const req = new Request('https://invitation.legacysoft.biz.id/api/config', {
      method: 'GET',
      headers: { 'CF-Connecting-IP': '192.168.1.100' }
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(data.general && data.general.coupleNames === 'Lutfi & Firdha', 'Public GET /api/config returns general config');
    assert(data.guestList === undefined, 'VULN-01: Public GET /api/config MUST NOT return guestList (PII leak prevented)');
  }

  // TEST 2: VULN-01 - GET /api/config (Authenticated Admin Request)
  {
    const req = new Request('https://invitation.legacysoft.biz.id/api/config', {
      method: 'GET',
      headers: { 
        'CF-Connecting-IP': '192.168.1.100',
        'X-Admin-Password': '262626'
      }
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(Array.isArray(data.guestList) && data.guestList.length === 2, 'Admin GET /api/config returns full guestList with auth header');
  }

  // TEST 3: VULN-02 - Server-Side Protection on /admin & /tamu without auth
  {
    const req = new Request('https://invitation.legacysoft.biz.id/admin', {
      method: 'GET',
      headers: { 'CF-Connecting-IP': '192.168.1.101' }
    });
    const res = await worker.fetch(req, mockEnv);
    const html = await res.text();
    assert(html.includes('Login - Admin Panel Undangan') && !html.includes('MOCK ASSET CONTENT'), 'VULN-02: Unauthenticated GET /admin returns server-side PIN login page');
  }

  // TEST 4: VULN-02 & VULN-04 - Login API & Session Cookie Issue
  let sessionCookie = '';
  {
    const req = new Request('https://invitation.legacysoft.biz.id/api/admin/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '192.168.1.102'
      },
      body: JSON.stringify({ password: '262626' })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    const setCookie = res.headers.get('Set-Cookie');
    assert(res.status === 200 && data.success === true, 'POST /api/admin/login succeeds with correct PIN');
    assert(setCookie && setCookie.includes('admin_session=') && setCookie.includes('HttpOnly'), 'POST /api/admin/login sets HttpOnly session cookie');
    sessionCookie = setCookie ? setCookie.split(';')[0] : '';
  }

  // TEST 5: VULN-02 - GET /admin with Session Cookie
  {
    const req = new Request('https://invitation.legacysoft.biz.id/admin', {
      method: 'GET',
      headers: { 
        'CF-Connecting-IP': '192.168.1.102',
        'Cookie': sessionCookie
      }
    });
    const res = await worker.fetch(req, mockEnv);
    const html = await res.text();
    assert(html.includes('MOCK ASSET CONTENT FOR /admin.html'), 'Authenticated GET /admin serves admin dashboard via session cookie');
  }

  // TEST 6: VULN-04 - Rate Limiting on Failed PIN verification
  {
    const testIp = '10.0.0.99';
    let blocked = false;
    for (let i = 0; i < 6; i++) {
      const req = new Request('https://invitation.legacysoft.biz.id/api/admin/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'CF-Connecting-IP': testIp
        },
        body: JSON.stringify({ password: 'wrong_password_' + i })
      });
      const res = await worker.fetch(req, mockEnv);
      if (res.status === 429) {
        blocked = true;
        break;
      }
    }
    assert(blocked, 'VULN-04: Brute-force rate limiting blocks IP after 5 failed attempts with HTTP 429');
  }

  // TEST 7: VULN-03 - Stored XSS prevention in POST /api/wishes (audio payload)
  {
    const xssPayload = 'x" onerror="alert(document.domain)';
    const req = new Request('https://invitation.legacysoft.biz.id/api/wishes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '192.168.1.105'
      },
      body: JSON.stringify({
        name: 'Hacker',
        text: 'Selamat Menikah!',
        audio: xssPayload
      })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(res.status === 200, 'Wish creation succeeds');
    assert(data.audio === null, 'VULN-03: XSS audio payload stripped to null in backend');
  }

  // TEST 8: VULN-03 - Safe audio payload in POST /api/wishes
  {
    const safeAudioPayload = 'data:audio/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQRChYECGFOAZwEAAAAAAAC';
    const req = new Request('https://invitation.legacysoft.biz.id/api/wishes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '192.168.1.106'
      },
      body: JSON.stringify({
        name: 'Tamu Baik',
        text: 'Selamat ya!',
        audio: safeAudioPayload
      })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(data.audio === safeAudioPayload, 'Valid Base64 audio payload preserved correctly');
  }

  // TEST 9: VULN-05 - DoS & Storage Bloat (Oversized audio rejected)
  {
    const hugeAudio = 'data:audio/webm;base64,' + 'A'.repeat(700000);
    const req = new Request('https://invitation.legacysoft.biz.id/api/wishes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '192.168.1.107'
      },
      body: JSON.stringify({
        name: 'Spammer',
        text: 'Huge payload',
        audio: hugeAudio
      })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(data.audio === null, 'VULN-05: Oversized audio string (>600KB) stripped to null');
  }

  // TEST 10: Atomic Guest API - Add Single Guest
  {
    const req = new Request('https://invitation.legacysoft.biz.id/api/admin/guests', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Admin-Password': '262626'
      },
      body: JSON.stringify({
        action: 'add',
        guest: { id: 999, name: 'Tamu Baru Test', phone: '0811111111' }
      })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'POST /api/admin/guests add succeeds');
    assert(data.guestList[0].name === 'Tamu Baru Test', 'New guest atomically unshifted to index 0 (No. 1)');
  }

  // TEST 11: Atomic Guest API - Delete Guest by ID
  {
    const req = new Request('https://invitation.legacysoft.biz.id/api/admin/guests', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Admin-Password': '262626'
      },
      body: JSON.stringify({
        action: 'delete',
        id: 999
      })
    });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json();
    assert(res.status === 200 && !data.guestList.some(g => g.id === 999), 'POST /api/admin/guests delete removes guest atomically');
  }

  // TEST 12: Auto-Snapshot Creation
  {
    const snapshot = mockKv.get('config_backup_latest');
    assert(snapshot !== null && snapshot !== undefined, 'Auto-snapshot config_backup_latest created in KV');
  }

  console.log(`\n--- TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED ---`);
}

runTests();
