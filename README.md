# bucko.uk

Plain HTML site. No build step, no database — upload the folder and it works.

## Updating the site (Tom, read this bit)

Everything you'll ever want to change lives in **one file: `content.js`**.
Gigs, releases, videos, quotes, links, bio — all in there with instructions at the top.

Typical jobs:

| I want to…                      | Do this in `content.js`                                            |
|---------------------------------|--------------------------------------------------------------------|
| Add a gig                       | Copy one of the `{ date: ... }` blocks in `gigs`, change the details |
| Mark a gig sold out             | Change `sold: false` to `sold: true`                               |
| Add a new single / EP           | Add a line to `releases` with the Spotify link bit (`album/XXXX`)   |
| Add a video                     | Add `{ title: "...", youtube: "VIDEO_ID" }` to `videos`            |
| Change the bio / quotes / FFO   | Edit the text in `bio`, `quotes`, `ffo`                            |
| Add the WhatsApp link           | Paste it into `links.whatsapp`                                     |
| Add a press download            | Put the file in `assets/`, add a line to `downloads`               |

Past gigs disappear from the Live page by themselves (and show up faded under "Previously").

Then upload `content.js` to wherever the site is hosted. That's it.

**Getting the contact form working:** sign up at https://web3forms.com with
booking@bucko.uk (free), copy the Access Key they email you, and paste it into
`web3formsKey` in `content.js`. Until then the form opens the visitor's email app
with the message pre-filled, so nothing is lost.

## Pages

| URL                 | File           | Notes                                          |
|---------------------|----------------|------------------------------------------------|
| `/`                 | `index.html`   | Replaces the Linktree                          |
| `/live`             | `live.html`    | Gigs + ticket links                            |
| `/music`            | `music.html`   | Spotify embeds + videos                        |
| `/contact`          | `contact.html` | Form → booking@bucko.uk, mailing list, WhatsApp|
| `/press`            | `press.html`   | Not linked anywhere, hidden from Google        |
| `shop.bucko.uk`     | —              | Shopify, separate. Nav just links to it        |

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

- `content.js` — all editable content
- `css/site.css`, `js/site.js` — look and behaviour; shouldn't need touching
- `assets/` — logo, photos, hi-res press downloads, the grunge frame
- `old-canva/` — the original Canva press-kit PNGs, kept for reference, not used by the site

## Live preview

Published free on GitHub Pages: **https://haveigottime.github.io/bucko-preview/**
Pushing to the `main` branch updates the live site within a minute or two.
When it moves to bucko.uk, nothing needs changing — all paths are relative.
