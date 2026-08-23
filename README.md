# bucko.uk

Plain HTML site. No build step, no database — upload the folder and it works.

## Updating the site

Tom edits through **Decap CMS at `/admin`** (see `UPDATING.md` / `docs/updating-guide.html`).
The editor reads and writes the JSON files in `data/`; the pages fetch those same files.
If the editor is unavailable, editing `data/*.json` directly on GitHub does the same thing.

### Editor login (one-time setup by Rory)

Tom logs in with a site password — he needs no GitHub account. `functions/api/auth.js`
(a Cloudflare Pages Function) checks the password and hands Decap a GitHub token that is
limited to this repo.

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
   → Generate: Repository access = only `bucko-preview`; Permissions → Contents: **Read and write**
   (Metadata read is added automatically). Set a long expiry (max is 1 year — diary it).
2. Cloudflare → the Pages project → Settings → Variables and Secrets → add for Production:
   `EDITOR_PASSWORD` (secret) and `GITHUB_TOKEN` (secret). Redeploy.
3. Commits made through the editor show as coming from the token's owner.

The editor only works at `https://bucko.uk/admin` (that's the `base_url` in `admin/config.yml`).
Before the domain moves, temporarily set `base_url` to the project's `*.pages.dev` address to test.

## Pages

| URL                 | File           | Notes                                          |
|---------------------|----------------|------------------------------------------------|
| `/`                 | `index.html`   | Replaces the Linktree                          |
| `/live`             | `live.html`    | Gigs + ticket links                            |
| `/music`            | `music.html`   | Spotify embeds + videos                        |
| `/contact`          | `contact.html` | Form → booking@bucko.uk, mailing list, WhatsApp|
| `/press`            | `press.html`   | Not linked anywhere, hidden from Google        |
| `/shop`             | `shop.html`    | List of shop links from `data/shop.json`; "Coming soon" if none |

## Hosting

Static files. Works on Vercel (`vercel.json` gives clean URLs), Netlify, Cloudflare
Pages, or any web host. If you're on plain shared hosting and `/live` gives a 404,
either enable "clean URLs"/"remove .html extension" or add this `.htaccess`:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

## Local preview

```
python3 serve.py
```
then open http://localhost:8765

## Folder

- `data/*.json` — all editable content (written by the editor)
- `admin/` — Decap CMS editor + its config
- `functions/api/` — password login for the editor (Cloudflare Pages Function)
- `css/site.css`, `js/site.js` — look and behaviour; shouldn't need touching
- `assets/` — logo, photos, hi-res press downloads, the grunge frame
- `old-canva/` — the original Canva press-kit PNGs, kept for reference, not used by the site

## Live preview

Published free on GitHub Pages: **https://haveigottime.github.io/bucko-preview/**
Pushing to the `main` branch updates the live site within a minute or two.
When it moves to bucko.uk, nothing needs changing — all paths are relative.
