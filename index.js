import defaultConfig from './data/config.json';
import defaultWishes from './data/wishes.json';

function checkAuth(request, env) {
  const providedPassword = request.headers.get('X-Admin-Password');
  const correctPassword = env.ADMIN_PASSWORD || 'lutfifirdha2026';
  return providedPassword === correctPassword;
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API Routes
    if (url.pathname === '/api/config') {
      if (request.method === 'GET') {
        if (!checkAuth(request, env)) return unauthorizedResponse();
        const stored = await env.INVITATION_DB.get('config');
        const config = stored ? JSON.parse(stored) : defaultConfig;
        return new Response(JSON.stringify(config, null, 2), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password'
          }
        });
      }

      if (request.method === 'POST') {
        if (!checkAuth(request, env)) return unauthorizedResponse();
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

    if (url.pathname === '/api/wishes') {
      if (request.method === 'GET') {
        const stored = await env.INVITATION_DB.get('wishes');
        const wishes = stored ? JSON.parse(stored) : defaultWishes;
        return new Response(JSON.stringify(wishes, null, 2), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          let wishes = [];
          const stored = await env.INVITATION_DB.get('wishes');
          if (stored) {
            wishes = JSON.parse(stored);
          } else {
            wishes = [...defaultWishes];
          }

          const newWish = {
            id: Date.now(),
            name: body.name,
            status: body.status || 'Hadir',
            count: parseInt(body.count) || 1,
            text: body.text,
            date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
          };

          wishes.unshift(newWish);
          await env.INVITATION_DB.put('wishes', JSON.stringify(wishes, null, 2));

          return new Response(JSON.stringify(newWish), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Failed to save wish' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      if (request.method === 'DELETE') {
        if (!checkAuth(request, env)) return unauthorizedResponse();
        await env.INVITATION_DB.put('wishes', JSON.stringify([], null, 2));
        return new Response(JSON.stringify({ success: true }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password'
        }
      });
    }

    // Fallback: If no static asset or API matches
    return new Response('Not Found', { status: 404 });
  }
};
