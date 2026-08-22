/* Renders the pages from the JSON files in /data (edited via /admin). You shouldn't need to edit this. */
(function () {
  var FILES = ["gigs", "music", "about", "socials", "settings"];
  Promise.all(FILES.map(function (f) { return fetch("data/" + f + ".json", { cache: "no-cache" }).then(function (r) { return r.json(); }); }))
    .then(function (parts) { render(parts.reduce(function (a, b) { for (var k in b) a[k] = b[k]; return a; }, {})); })
    .catch(function (e) { console.error("Could not load site content", e); });

function render(C) {
  var L = C.links || {};
  var $ = function (s) { return document.querySelector(s); };
  var SHOP = (C.shopLive && L.shop) ? L.shop : "shop";
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function parseDate(s) { var p = (s || "").split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function fmt(d) { return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }

  function sortedGigs() {
    return (C.gigs || []).slice().filter(function (g) { return g.date; })
      .sort(function (a, b) { return parseDate(a.date) - parseDate(b.date); });
  }
  function upcomingGigs() { var t = today(); return sortedGigs().filter(function (g) { return parseDate(g.date) >= t; }); }

  /* ---- nav ---- */
  var navEl = $("[data-nav]");
  if (navEl) {
    var here = location.pathname.split("/").pop().replace(/\.html$/, "");
    var items = [["live","Live"],["music","Music"],[SHOP,"Shop"],["contact","Contact"]];
    navEl.innerHTML =
      '<a class="mark" href="./"><img src="assets/logo.png" alt=""><span>Bucko</span></a><ul>' +
      items.map(function (i) {
        if (!i[0]) return "";
        var ext = /^https?:/.test(i[0]);
        var cur = !ext && here === i[0] ? ' aria-current="page"' : "";
        return '<li><a href="' + esc(i[0]) + '"' + cur + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + i[1] + "</a></li>";
      }).join("") + "</ul>";
  }

  /* ---- footer bar ---- */
  var barEl = $("[data-bar]");
  if (barEl) {
    var socials = [["Instagram",L.instagram],["TikTok",L.tiktok],["Facebook",L.facebook],["YouTube",L.youtube],["Spotify",L.spotify],["Apple Music",L.appleMusic]]
      .filter(function (s) { return s[1]; })
      .map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + "</a>"; }).join("");
    barEl.innerHTML =
      '<div class="cell socials">' + socials + "</div>" +
      (C.featured && barEl.hasAttribute("data-featured") ? '<div class="cell">' + esc(C.featured) + "</div>" : "") +
      '<div class="cell quiet">Bookings: <a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a> &nbsp;·&nbsp; &copy; Bucko " + new Date().getFullYear() + "</div>";
  }

  /* ---- home ---- */
  var home = $("[data-home]");
  if (home) {
    var next = upcomingGigs()[0];
    var nextTxt = next ? fmt(parseDate(next.date)) + " — " + esc(next.venue) + ", " + esc(next.city) : "No dates announced yet";
    var latest = (C.releases || [])[0];
    var latestTxt = latest ? "Latest: " + esc(latest.title) + " (" + esc(latest.type) + ")" : "Stream everything";
    var rows = [
      ["live", "Live dates", nextTxt],
      ["music", "Music", latestTxt],
      [SHOP, "Shop", C.shopLive ? "Merch" : "Coming soon"],
      ["contact", "Contact", "Bookings, mailing list, WhatsApp"]
    ];
    home.innerHTML = '<ul class="setlist">' + rows.map(function (r) {
      if (!r[0]) return "";
      var ext = /^https?:/.test(r[0]);
      return '<li><a href="' + esc(r[0]) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + '><span>' + r[1] + '</span><span class="meta">' + r[2] + '&nbsp;<span class="arrow">&rarr;</span></span></a></li>';
    }).join("") + "</ul>";
    var sr = $("[data-socialrow]");
    if (sr) sr.innerHTML = [["Instagram",L.instagram],["TikTok",L.tiktok],["Facebook",L.facebook],["YouTube",L.youtube],["Spotify",L.spotify],["Apple Music",L.appleMusic]]
      .filter(function (s) { return s[1]; })
      .map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + "</a>"; }).join("");
  }

  /* ---- live ---- */
  var gigsEl = $("[data-gigs]");
  if (gigsEl) {
    var up = upcomingGigs();
    if (!up.length) {
      gigsEl.innerHTML = '<p class="empty">No dates announced yet.<br>Join the mailing list and you\'ll be first to know.</p>';
    } else {
      gigsEl.innerHTML = '<ul class="gigs">' + up.map(function (g) {
        var d = parseDate(g.date);
        var action = g.sold ? '<span class="stamp">Sold out</span>'
          : g.tickets ? '<a class="btn" href="' + esc(g.tickets) + '" target="_blank" rel="noopener">Tickets</a>'
          : '<span class="stamp">Free entry</span>';
        return '<li class="gig">' +
          '<div class="when">' + fmt(d) + "<small>" + d.getFullYear() + (g.time ? " · " + esc(g.time) : "") + "</small></div>" +
          '<div class="where"><h3>' + esc(g.venue) + ", " + esc(g.city) + "</h3>" + (g.event ? "<p>" + esc(g.event) + "</p>" : "") + "</div>" +
          '<div class="btn-wrap">' + action + "</div></li>";
      }).join("") + "</ul>";
    }
    var pastEl = $("[data-past]");
    if (pastEl) {
      var t = today();
      var past = sortedGigs().filter(function (g) { return parseDate(g.date) < t; }).reverse().slice(0, 8);
      pastEl.innerHTML = past.length ? '<hr class="rule"><h2>Previously</h2><ul class="gigs">' + past.map(function (g) {
        var d = parseDate(g.date);
        return '<li class="gig past"><div class="when">' + fmt(d) + "<small>" + d.getFullYear() + "</small></div>" +
          '<div class="where"><h3>' + esc(g.venue) + ", " + esc(g.city) + "</h3>" + (g.event ? "<p>" + esc(g.event) + "</p>" : "") + "</div><div></div></li>";
      }).join("") + "</ul>" : "";
    }
  }

  /* ---- music ---- */
  var relEl = $("[data-releases]");
  if (relEl) {
    relEl.innerHTML = (C.releases || []).map(function (r) {
      var h = /^album\//.test(r.spotify) ? 352 : 152;
      return '<article class="release"><header><h3>' + esc(r.title) + '</h3><span class="type">' + esc(r.type) +
        (r.date ? " · " + esc(r.date.slice(0, 4)) : "") + "</span></header>" +
        (r.spotify ? '<iframe src="https://open.spotify.com/embed/' + esc(r.spotify) + '?theme=0" height="' + h + '" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="' + esc(r.title) + ' on Spotify"></iframe>' : "") +
        (r.appleMusic ? '<p class="also">Also on <a href="' + esc(r.appleMusic) + '" target="_blank" rel="noopener">Apple Music</a></p>' : "") +
        "</article>";
    }).join("");
  }
  var vidEl = $("[data-videos]");
  if (vidEl) {
    vidEl.innerHTML = (C.videos || []).map(function (v) {
      return '<div><div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.youtube) + '?rel=0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="' + esc(v.title) + '"></iframe></div>' +
        '<p class="video-title">' + esc(v.title) + "</p></div>";
    }).join("");
  }

  /* ---- press ---- */
  var fill = function (sel, html) { var e = $(sel); if (e) e.innerHTML = html; };
  fill("[data-lines]", [C.tagline].concat(C.lines || []).map(function (l) { return "<div>" + esc(l) + "</div>"; }).join(""));
  fill("[data-bio]", (C.bio || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + (C.signoff ? "<p>" + esc(C.signoff) + "</p>" : ""));
  fill("[data-quotes]", (C.quotes || []).map(function (q) { return '<blockquote class="quote">&ldquo;' + esc(q.text) + '&rdquo; &ndash; <cite>' + esc(q.who) + "</cite></blockquote>"; }).join(""));
  fill("[data-ffo]", C.ffo ? '<div class="cell">FFO:<br>' + esc(C.ffo) + "</div>" : "");
  fill("[data-downloads]", '<ul class="dl">' + (C.downloads || []).map(function (d) {
    return '<li><a href="' + esc(d.file) + '" download>' + esc(d.label) + "<span>Download</span></a></li>"; }).join("") + "</ul>");
  fill("[data-linkgrid]", [["Instagram",L.instagram],["TikTok",L.tiktok],["Facebook",L.facebook],["YouTube",L.youtube],["Spotify",L.spotify],["Apple Music",L.appleMusic],["Shop",C.shopLive ? L.shop : ""]]
    .filter(function (s) { return s[1]; })
    .map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + "<small>" + esc(s[1].replace(/^https?:\/\/(www\.)?/, "")) + "</small></a>"; }).join(""));
  fill("[data-email]", '<a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>");
  var pv = $("[data-pressvideo]");
  if (pv && (C.videos || [])[0]) pv.innerHTML = '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(C.videos[0].youtube) + '?rel=0" loading="lazy" allowfullscreen title="' + esc(C.videos[0].title) + '"></iframe></div>';
  var pe = $("[data-pressembed]");
  if (pe && /artist\/([A-Za-z0-9]+)/.test(L.spotify || "")) pe.innerHTML = '<iframe src="https://open.spotify.com/embed/artist/' + RegExp.$1 + '?theme=0" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Bucko on Spotify" style="width:100%;border:0;border-radius:12px"></iframe>';

  /* ---- contact ---- */
  var form = $("[data-contact-form]");
  if (form) {
    var key = (C.web3formsKey || "").trim();
    var note = $("[data-form-note]");
    if (key) form.querySelector('[name="access_key"]').value = key;
    if (!key && note) note.innerHTML = 'Or email us directly: <a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>.";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = new FormData(form);
      if (!key) {
        /* No form key set up yet: open their email app with the message filled in. */
        var body = "Name: " + f.get("name") + "\nEmail: " + f.get("email") + "\nAbout: " + f.get("topic") + "\n\n" + f.get("message");
        location.href = "mailto:" + L.email + "?subject=" + encodeURIComponent(f.get("topic") + " — via bucko.uk") + "&body=" + encodeURIComponent(body);
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending";
      var data = {}; f.forEach(function (v, k) { data[k] = v; });
      fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r.success) { form.reset(); note.className = "note ok"; note.textContent = "Sent. We'll get back to you."; }
          else { throw new Error(r.message || "failed"); }
        })
        .catch(function () { note.className = "note bad"; note.innerHTML = 'That didn\'t send. Email us instead: <a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>"; })
        .then(function () { btn.disabled = false; btn.textContent = "Send"; });
    });
  }
  var ml = $("[data-mailing]"); if (ml) ml.href = L.mailingList || "#";
  if (form) {
    var wa = $("[data-whatsapp]");
    if (wa) { if (L.whatsapp) wa.href = L.whatsapp; else wa.parentNode.innerHTML = '<p>WhatsApp broadcast coming soon. Join the mailing list and we\'ll send you the link.</p>'; }
  }
}
})();
