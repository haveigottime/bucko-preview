# Updating bucko.uk — Tom's manual

Full illustrated version: `docs/updating-guide.html` (open it in a browser).

**Every time:** open https://github.com/haveigottime/bucko-preview/edit/main/content.js
→ change the words → **Commit changes** (twice) → wait a minute → refresh bucko.uk.

Rules: text stays inside `"quotes"`, every line ends with a comma, dates are `"2026-09-12"`.

| Job | Where in `content.js` |
|---|---|
| Add a gig | copy a `{ ... },` block in `gigs`, change the details. Sorted + hidden automatically. |
| Sold out | `sold: true` |
| New single/EP | top of `releases`; Spotify code = the bit after `open.spotify.com/` (drop `?si=...`) |
| New video | `videos`; code = the bit after `youtu.be/` |
| Bio / quotes / FFO | `bio`, `quotes`, `ffo` |
| WhatsApp / any link | `links` |
| Shop goes live | `shopLive: true` in `links` (until then /shop says "Coming soon") |
| Press photo | upload to `assets/` on GitHub, then add to `downloads` |
| Contact form to inbox | get a free key at web3forms.com → `web3formsKey` |

**Site gone blank?** Lost a quote or comma. GitHub → History → previous version → Revert. Or message Rory.

Don't touch: `index.html`, `css/`, `js/` — that's the machinery.
