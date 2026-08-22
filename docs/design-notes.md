# bucko.uk — design notes (22 Aug 2026)

Brief from Tom: same style as the Canva press kit (cream + black), homepage that
replaces Linktree, /live, /music, /contact, hidden /press, shop on Shopify, and
it has to be editable by someone non-technical every few weeks.

Decisions:
- Static HTML, no framework, no build. One `content.js` holds every editable thing;
  `js/site.js` renders pages from it. Cheapest possible thing for Tom to maintain.
- Palette is strictly cream #f7f4ea and ink #161616, plus a dim #6b6759 for sub-labels.
  No accent colour — the Canva has none and the grunge texture is the accent.
- Type: Bebas Neue (display) + Poppins 500/600 (body). Both are what the Canva used.
- Signature: the actual grunge frame from the Canva export, sliced into a 9-patch
  (`assets/frame.png`) and used as a CSS `border-image`, so every page is a flyer.
- Home = a "set list" of four big black link blocks (Live / Music / Shop / Contact),
  each with a live sub-line (next gig, latest release). Footer reproduces the press
  kit's outlined black bar (socials | "As featured on BBC Introducing").
- Press page is a faithful HTML rebuild of the two Canva pages with embeds, social
  links instead of QR, downloads, and `noindex`. Not in the nav.
- Contact: Web3Forms (no backend) with mailto fallback until the key is set; mailing
  list links to existing subscribepage.io; WhatsApp slot in content.js.
- Upgrade path if editing a JS file proves too fiddly: add Decap CMS at /admin
  pointed at content.js, or move content to a Google Sheet and fetch it.
