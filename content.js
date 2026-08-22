/* =====================================================================
   BUCKO WEBSITE CONTENT
   ---------------------------------------------------------------------
   This is the ONLY file you need to touch to update the site.
   Rules of thumb:
     - Text goes inside "quotes".
     - Every item in a list ends with a comma.
     - Dates are written YEAR-MONTH-DAY, e.g. "2026-09-12".
     - Leave something blank with "" if you don't have it yet.
     - If the site goes blank after an edit, you've probably lost a
       quote mark or a comma. Undo and try again.
   ===================================================================== */

window.BUCKO = {

  /* ---------- THE BASICS ---------- */
  tagline: "DIY two piece from Nottingham",
  lines: [
    "Built from the ground up",
    "Recorded, mixed, and mastered by us.",
  ],
  featured: "As featured on BBC Introducing",
  ffo: "Kasabian, Idles, Sleaford Mods, and noise",

  /* ---------- LINKS ---------- */
  links: {
    instagram:   "https://instagram.com/Bucko_UK",
    tiktok:      "https://tiktok.com/@bucko_uk",
    facebook:    "https://www.facebook.com/buckouk/",
    youtube:     "https://www.youtube.com/@bucko_uk",
    spotify:     "https://open.spotify.com/artist/6rkRoPoOMV0T0FkMhJMrny",
    appleMusic:  "https://music.apple.com/gb/album/bucko-ep/6799547728",
    shop:        "https://shop.bucko.uk",
    shopLive:    false,           /* change to true when the Shopify store is ready - Shop links then go straight there */
    mailingList: "https://subscribepage.io/bucko",
    whatsapp:    "",              /* paste your WhatsApp channel/broadcast invite link here when it's set up */
    email:       "booking@bucko.uk",
  },

  /* ---------- GIGS ----------
     Add new gigs anywhere in this list - the site sorts them by date
     and hides them automatically the day after they've happened.
     "tickets" can be "" if it's free / not on sale yet.
     "sold": true  puts a SOLD OUT stamp on it.                      */
  gigs: [
    {
      date: "2026-09-12",
      event: "Crawlchella",
      venue: "The Grove",
      city: "Nottingham",
      time: "14:30",
      tickets: "https://www.gigantic.com/crawlchella-tickets/nottingham-the-grove/2026-09-12-14-30",
      sold: false,
    },
  ],

  /* ---------- MUSIC ----------
     "spotify" is the bit of the Spotify link after open.spotify.com/
     e.g. https://open.spotify.com/album/5byAof...  ->  "album/5byAof..."
     Newest at the top.                                               */
  releases: [
    { title: "Bucko",    type: "EP",     date: "2026-08-14", spotify: "album/5byAofE0XSGLIUZEU8VSV2", appleMusic: "https://music.apple.com/gb/album/bucko-ep/6799547728" },
    { title: "Terraces", type: "Single", date: "2026-07-24", spotify: "album/2ISRqh7M2WIWrDWAJE6av4", appleMusic: "" },
    { title: "Twisted",  type: "Single", date: "2026-03-30", spotify: "album/1DDEahnbAc6Z5JjS0bBVl4", appleMusic: "" },
  ],

  /* ---------- VIDEOS ----------
     "youtube" is the bit after youtu.be/ or after watch?v=            */
  videos: [
    { title: "Terraces (Music Video)", youtube: "1jp16cV-z8E" },
  ],

  /* ---------- ABOUT / BIO ----------
     Each paragraph is its own line in quotes.                        */
  bio: [
    "Since forming in March 2026, we’ve released two singles, one EP, and sold out our debut headliner during presale.",
    "We’ve been in bands before, but now we’re back. We’re not holding back though. These songs are about our lives. Messy. But honest.",
    "Live is the real experience.",
  ],
  signoff: "George & Tom.",

  /* ---------- WHAT PEOPLE SAY ---------- */
  quotes: [
    { text: "Brilliant… reminds me of the Skinner Brothers", who: "Gavin Monaghan (Magic Garden Studios)" },
    { text: "Bucko sound like a band who belong in a sweaty, packed-out venue, where these songs could really come alive. 10/10", who: "That Blogger Music" },
  ],

  /* ---------- PRESS KIT EXTRAS ----------
     Files for promoters / press to download. Drop new files in the
     assets folder and add them here.                                 */
  downloads: [
    { label: "Studio photo (hi-res)", file: "assets/bucko-studio-hires.jpg" },
    { label: "Live photo (hi-res)",   file: "assets/bucko-live-hires.jpg" },
    { label: "Logo (PNG)",            file: "assets/logo.png" },
  ],

  /* ---------- CONTACT FORM ----------
     The form uses web3forms.com (free). Sign up with booking@bucko.uk,
     copy the Access Key they email you, and paste it between the quotes.
     Until then the form shows an email link instead.                 */
  web3formsKey: "",
};
