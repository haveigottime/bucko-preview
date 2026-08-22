// Login for the site editor at /admin.
// Decap CMS opens this in a popup. We ask for the site password; if it's right we hand
// Decap a GitHub token that can only touch this one repo. Nobody editing needs a GitHub account.
//
// Needs two secrets in the Cloudflare Pages project (Settings → Variables and Secrets):
//   EDITOR_PASSWORD  - the password Tom types in
//   GITHUB_TOKEN     - a fine-grained GitHub token for haveigottime/bucko-preview, Contents: read & write

const page = (inner) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Bucko — editor login</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@500;600&display=swap" rel="stylesheet">
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0e0e0e;font-family:Poppins,Arial,sans-serif;font-weight:500}
  .card{background:#f7f4ea;color:#161616;border:12px solid #161616;outline:3px solid #f7f4ea;outline-offset:-18px;padding:44px 40px 40px;width:min(92vw,380px);text-align:center}
  h1{font:400 52px/1 "Bebas Neue",Impact,sans-serif;margin:0 0 6px;text-transform:uppercase}
  p{margin:0 0 22px;font-size:14px}
  input{font:inherit;width:100%;box-sizing:border-box;border:3px solid #161616;background:transparent;padding:12px;margin-bottom:12px;border-radius:0}
  button{font:400 24px/1 "Bebas Neue",Impact,sans-serif;text-transform:uppercase;background:#161616;color:#f7f4ea;border:3px solid #161616;padding:12px 22px 9px;cursor:pointer;width:100%}
  button:hover{background:#f7f4ea;color:#161616}
  .bad{font-weight:600;text-decoration:underline}
</style></head><body><div class="card">${inner}</div></body></html>`;

const form = (msg) => page(`<h1>Bucko</h1><p>${msg || "Site editor. Password, please."}</p>
  <form method="post"><input type="password" name="password" autofocus autocomplete="current-password" aria-label="Password"><button>Log in</button></form>`);

function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function onRequestGet() {
  return new Response(form(), { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function onRequestPost({ request, env }) {
  if (!env.EDITOR_PASSWORD || !env.GITHUB_TOKEN)
    return new Response(page("<h1>Not set up</h1><p>EDITOR_PASSWORD and GITHUB_TOKEN need adding in the Cloudflare Pages settings.</p>"), { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } });

  const data = await request.formData();
  const ok = same(String(data.get("password") || ""), env.EDITOR_PASSWORD);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 1500)); // slow down guessing
    return new Response(form('<span class="bad">Wrong password.</span> Try again.'), { status: 401, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  // The Decap CMS handshake: popup says "authorizing:github", opener answers, popup sends the token.
  const msg = "authorization:github:success:" + JSON.stringify({ token: env.GITHUB_TOKEN, provider: "github" });
  const html = page(`<h1>Logged in</h1><p>Taking you to the editor…</p><script>
    (function () {
      function receive(e) { window.opener.postMessage(${JSON.stringify(msg)}, e.origin); window.removeEventListener("message", receive); }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>`);
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
