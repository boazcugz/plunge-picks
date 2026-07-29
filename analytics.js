/* ============================================================================
   PlungeWise — event tracking, cookie consent + shared UI behaviour.
   Implements MASTER_BRIEF_V2 §10.2 (click separation), §14 (accessibility),
   §16 (event taxonomy).

   COOKIE CONSENT — ADDED 29.07.2026 (PW-CONSENT-001). See part 6 at the
   bottom of this file. Storage is denied by default from the <head> of every
   page; this file only draws the banner and reports the visitor's answer.

   PRIVACY (§16, non-negotiable):
   Never send an email address, a name, a phone number, free personal text, or
   any other PII into an event payload. Only the whitelisted parameters below
   are ever forwarded: page_slug, product_slug, merchant, cta_position,
   link_type, diy_path, price_category, affiliate_status.

   GA4 — CONNECTED 28.07.2026 (PW-GA4-001). Property: PlungeWise.
   Measurement ID G-PKK357JEH1, supplied by Boaz. It is not a secret: a GA4
   Measurement ID is designed to be readable in client-side code.

   The Google tag lives in <head> on all 24 pages, above this file's include.
   It is the ONLY analytics tag on the site: no Universal Analytics, no Tag
   Manager container, and exactly one gtag('config') call per page, which is
   what produces exactly one page_view per page load.

   If a Measurement ID ever changes it must change in 24 <head> blocks AND in
   this comment. Search the repo for the ID itself, not for "gtag".

   Set window.PLUNGE_DEBUG = true in the console to see every dispatch.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. Merchant registry — MIRRORS affiliate-programs.js (§10.2).

     affiliate-programs.js is the single source of truth but is not loaded on
     any page, so this mirror exists for runtime lookups.
     ORDER OF UPDATES, ALWAYS: update affiliate-programs.js FIRST, then flip
     the matching entry here. Never the reverse.

     status "approved" means: the program accepted us AND the links carry a
     real tracking parameter. Anything else is a plain merchant link and must
     NOT be counted as an affiliate conversion.
     --------------------------------------------------------------------- */
  var MERCHANTS = [
    { host: "amazon.",        brand: "Amazon",          status: "approved",     kind: "amazon" },
    { host: "amzn.to",        brand: "Amazon",          status: "approved",     kind: "amazon" },
    { host: "plunge.com",     brand: "Plunge",          status: "not_approved", kind: "brand" },
    { host: "sunhomesaunas.", brand: "Sun Home Saunas", status: "not_approved", kind: "brand" },
    { host: "hydragun.",      brand: "Hydragun",        status: "not_approved", kind: "brand" },
    { host: "thecoldpod.",    brand: "The Cold Pod",    status: "not_approved", kind: "brand" },
    { host: "icebarrel.",     brand: "Ice Barrel",      status: "not_approved", kind: "brand" },
    { host: "polarmonkeys.",  brand: "Polar Monkeys",   status: "not_approved", kind: "brand" },
    { host: "thenordicwave.", brand: "Nordic Wave",     status: "not_approved", kind: "brand" }
  ];

  // If affiliate-programs.js ever IS loaded, it wins over the mirror.
  function programStatusFor(brand, fallback) {
    try {
      var reg = window.PLUNGE_AFFILIATE_PROGRAMS;
      if (!reg) return fallback;
      var list = Array.isArray(reg) ? reg : (reg.programs || []);
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var name = p.name || p.brand || "";
        if (name.toLowerCase() === String(brand).toLowerCase()) {
          var st = p.approvalStatus || p.applicationStatus || "";
          return st === "approved" ? "approved" : "not_approved";
        }
      }
    } catch (_) {}
    return fallback;
  }

  function merchantFor(host) {
    for (var i = 0; i < MERCHANTS.length; i++) {
      if (host.indexOf(MERCHANTS[i].host) > -1) return MERCHANTS[i];
    }
    return null; // unknown host — a source link, a social link. Not tracked.
  }

  /* ---------------------------------------------------------------------
     2. Dispatcher
     --------------------------------------------------------------------- */
  function pageSlug() {
    try {
      var p = location.pathname.replace(/^\/+/, "").replace(/\.html$/i, "");
      if (!p || p === "index") return "home";
      return p;
    } catch (_) { return ""; }
  }

  window.plungeTrack = function (event, params) {
    params = params || {};
    try {
      if (!params.page_slug) params.page_slug = pageSlug();
      if (typeof window.gtag === "function") {
        // Normal path. gtag() itself pushes onto dataLayer, so nothing else
        // may push the same event — see the else-branch below.
        window.gtag("event", event, params);
      } else if (Array.isArray(window.dataLayer)) {
        // Fallback only. Before PW-GA4-001 this branch ran unconditionally
        // alongside the gtag call, which would have written every event to
        // dataLayer twice once a real tag existed. It is now mutually
        // exclusive with the gtag path, so an event is queued exactly once.
        window.dataLayer.push(Object.assign({ event: event }, params));
      }
      if (window.PLUNGE_DEBUG) { console.log("[plungeTrack]", event, params); }
    } catch (e) { /* analytics must never break the page */ }
  };

  // Flush anything the <head> stub queued while the document was parsing.
  // Order is preserved, and each queued event gets its page_slug here, so a
  // queued event is indistinguishable from a live one.
  try {
    var queued = window.__plungeQ;
    window.__plungeQ = [];
    if (queued && queued.length) {
      for (var qi = 0; qi < queued.length; qi++) {
        window.plungeTrack.apply(null, queued[qi]);
      }
    }
  } catch (_) {}

  /* ---------------------------------------------------------------------
     3. Link clicks — merchant vs affiliate vs Amazon (§10.2)

       amazon_affiliate_click — Amazon link that actually carries our tag
       affiliate_click        — approved direct program AND a tracking param
       merchant_click         — everything else commercial (plain brand link)

     A merchant_click is NOT an affiliate conversion and must never be
     reported as one.
     --------------------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;

    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }

    var host = url.hostname.replace(/^www\./, "");
    var isExternal = url.hostname && url.hostname !== location.hostname;

    // Internal: the printable checklist is the lead magnet (§16 checklist_open).
    if (!isExternal) {
      if (/buyer-checklist\.html$/i.test(url.pathname)) {
        window.plungeTrack("checklist_open", {
          cta_position: a.getAttribute("data-pos") || ""
        });
      }
      return;
    }

    var m = merchantFor(host);
    if (!m) return; // unknown external host: source citation, social. Ignore.

    var status = programStatusFor(m.brand, m.status);
    var payload = {
      merchant: a.getAttribute("data-merchant") || m.brand,
      product_slug: a.getAttribute("data-product") || "",
      cta_position: a.getAttribute("data-pos") || "",
      link_type: m.kind
    };

    if (m.kind === "amazon") {
      var tag = "";
      try { tag = url.searchParams.get("tag") || ""; } catch (_) {}
      if (tag) {
        payload.affiliate_status = "approved";
        window.plungeTrack("amazon_affiliate_click", payload);
      } else {
        // An Amazon link with no tag earns nothing — count it as a plain
        // merchant click so the affiliate numbers stay honest.
        payload.affiliate_status = "missing_tag";
        window.plungeTrack("merchant_click", payload);
        if (window.PLUNGE_DEBUG) {
          console.warn("[plungeTrack] Amazon link without tag:", a.href);
        }
      }
      return;
    }

    var hasTracking = /[?&](ref|aff|affiliate|utm_source|irclickid|partner)=/i.test(url.search);
    if (status === "approved" && hasTracking) {
      payload.affiliate_status = "approved";
      window.plungeTrack("affiliate_click", payload);
    } else {
      payload.affiliate_status = (status === "approved") ? "approved_no_tracking" : "not_approved";
      window.plungeTrack("merchant_click", payload);
    }
  }, true);

  /* ---------------------------------------------------------------------
     4. Declarative hook: <button data-plunge-event="diy_path_selected"
                                  data-diy-path="stock_tank">
     Only whitelisted parameters are forwarded (§16).

     DIY funnel events (§16), all fired through this hook — the markup lives in
     diy-cold-plunge.html and in the homepage "Build It or Buy It?" section:

       diy_path_selected      — a visitor picks one of the three paths.
                                data-diy-path: ice_starter | diy_chiller | ready_made
       diy_component_click    — a click on a build component (tub, chiller, pump,
                                filtration, hoses) or on a costing tool from
                                inside a DIY path.
       diy_to_ready_made_click— a DIY reader crossing over to a finished system
                                (Best Cold Plunges / Product Finder). This is the
                                number that tells us whether the DIY hub feeds the
                                high-ticket side or cannibalises it.

     NOTE, deliberate: an Amazon component link carries BOTH data-plunge-event
     and the affiliate attributes, so one click fires diy_component_click here
     AND amazon_affiliate_click in section 3 above. They are different events
     measuring different things — funnel behaviour vs. affiliate click — and
     must not be summed. Revenue attribution uses amazon_affiliate_click only.
     --------------------------------------------------------------------- */
  var ALLOWED = ["product_slug", "cta_position", "diy_path", "price_category"];
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-plunge-event]") : null;
    if (!el) return;
    var name = el.getAttribute("data-plunge-event");
    if (!name) return;
    var params = {};
    for (var i = 0; i < ALLOWED.length; i++) {
      var attr = el.getAttribute("data-" + ALLOWED[i].replace(/_/g, "-"));
      if (attr) params[ALLOWED[i]] = attr;
    }
    window.plungeTrack(name, params);
  }, true);

  /* ---------------------------------------------------------------------
     5. Mobile nav — SINGLE source of truth (§14).
     Do NOT add a second burger listener in any page's inline script: two
     handlers toggle the class twice and the menu never opens.
     --------------------------------------------------------------------- */
  function navEls() {
    return {
      burger: document.getElementById("burger"),
      links: document.getElementById("navlinks")
    };
  }

  function setNav(open) {
    var els = navEls();
    if (!els.burger || !els.links) return;
    els.links.classList.toggle("open", open);
    els.burger.setAttribute("aria-expanded", open ? "true" : "false");
    els.burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  document.addEventListener("click", function (e) {
    var els = navEls();
    if (!els.burger || !els.links) return;
    var onBurger = e.target.closest && e.target.closest("#burger");
    if (onBurger) {
      setNav(!els.links.classList.contains("open"));
      return;
    }
    // Click outside an open menu closes it.
    if (els.links.classList.contains("open") &&
        !(e.target.closest && e.target.closest("#navlinks"))) {
      setNav(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" && e.key !== "Esc") return;
    var els = navEls();
    if (!els.links || !els.links.classList.contains("open")) return;
    setNav(false);
    if (els.burger) els.burger.focus();
  });

  /* ---------------------------------------------------------------------
     6. Cookie consent (PW-CONSENT-001, 29.07.2026)

     HOW THE TWO HALVES FIT TOGETHER

     The <head> of all 24 pages calls gtag('consent','default',...) with
     analytics_storage denied, BEFORE gtag('config'). That is the half that
     actually protects the visitor: by the time GA4 fires its first hit the
     denial is already in force, so no _ga cookie is written. This file only
     draws the banner and sends the 'update' when a choice is made. If this
     file failed to load, the site would still be cookieless — which is the
     safe direction to fail in, and is why the default lives in the <head>
     and not here.

     DECLINE STILL COUNTS. Under Consent Mode, a denied visitor is measured
     with cookieless pings: page views and events still reach GA4, they just
     carry no identifier, so that visit cannot be joined to the next one.
     Traffic totals stay honest; only returning-user and attribution numbers
     lose resolution. Do not "fix" this by removing the default.

     WHAT IS STORED. Nothing at all until the visitor answers. On an answer,
     one localStorage key, pw_consent, holding the single word "granted" or
     "denied". No cookie of our own, no id, no timestamp, no fingerprint.

     ACCEPTING MID-PAGE. GA4 has already sent that page's cookieless
     page_view by the time Accept is clicked; it is not re-sent. The cookie
     starts with the next hit. Expected, not a bug.

     NO NEW EVENT. The accept/decline choice is deliberately NOT tracked as
     a custom event — that would add a name to the fixed §16 taxonomy, and
     GA4 already reports consent state on its own. If a consent-rate number
     is ever wanted, add it to §16 first, then here.

     DELIBERATELY NOT A MODAL. It does not trap focus, does not dim the
     page, and does not steal focus on arrival — a visitor who ignores it
     reads the site normally, and that is intended. It has no X: closing
     without answering would have to mean something, and every meaning is
     either a dark pattern or a lie.

     NOT LEGAL ADVICE. This is an engineering implementation of a clear
     default-deny. Whether it satisfies a particular jurisdiction is a
     question for a lawyer, not for this file.
     --------------------------------------------------------------------- */
  var CONSENT_KEY = "pw_consent";
  var banner = null;

  function readConsent() {
    try {
      var v = localStorage.getItem(CONSENT_KEY);
      return (v === "granted" || v === "denied") ? v : null;
    } catch (_) { return null; }   // private mode / storage blocked
  }

  function pushConsent(state) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: state });
      }
      if (window.PLUNGE_DEBUG) { console.log("[consent]", state); }
    } catch (_) {}
  }

  // The bar is fixed to the bottom, so it would sit on top of the last line
  // of the footer. Reserve exactly its height while it is visible.
  function reserveSpace() {
    try {
      document.body.style.paddingBottom =
        (banner && !banner.hidden) ? (banner.offsetHeight + "px") : "";
    } catch (_) {}
  }

  function showBanner(moveFocus) {
    if (!banner) return;
    banner.hidden = false;
    reserveSpace();
    // Focus moves only when the visitor asked for the banner from the footer.
    // On a first visit it must not yank focus away from the page.
    if (moveFocus) {
      var b = banner.querySelector("button");
      if (b) b.focus();
    }
  }

  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    reserveSpace();
  }

  function choose(state) {
    try { localStorage.setItem(CONSENT_KEY, state); } catch (_) {}
    pushConsent(state);
    hideBanner();
  }

  function buildBanner() {
    var el = document.createElement("section");
    el.id = "pw-consent";
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Cookie choices");
    el.hidden = true;
    el.innerHTML =
      '<div class="pw-consent-inner">' +
        // Kept deliberately short: this bar is fixed to the bottom of a phone
        // screen, and every extra line of copy is a line of the article the
        // visitor cannot read until they answer.
        '<p><strong>We use analytics cookies.</strong> They show us which guides people ' +
        'actually use. No advertising cookies, nothing that identifies you. Decline and ' +
        'your visit is still counted &mdash; just without a cookie. ' +
        '<a href="privacy.html#cookies">How we handle data</a>.</p>' +
        '<div class="pw-consent-actions">' +
          '<button type="button" class="pw-decline">Decline</button>' +
          '<button type="button" class="pw-accept">Accept</button>' +
        '</div>' +
      '</div>';
    return el;
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Footer link. Without JS it is a real link to the privacy policy's
    // cookie section, which is why it is an <a href> and not a <button>.
    if (t.closest("[data-pw-consent-reopen]")) {
      e.preventDefault();
      showBanner(true);
      return;
    }
    if (!banner || banner.hidden) return;
    if (t.closest("#pw-consent .pw-accept")) { choose("granted"); }
    else if (t.closest("#pw-consent .pw-decline")) { choose("denied"); }
  });

  try {
    banner = buildBanner();
    document.body.appendChild(banner);

    var saved = readConsent();
    if (saved === null) {
      showBanner(false);
    } else {
      // Re-assert the saved answer. The <head> already applied it as the
      // default, so this is redundant on a healthy page load — it is here so
      // that state is still correct if the <head> read was the one that
      // failed (storage exceptions are not always symmetric).
      pushConsent(saved);
    }
    window.addEventListener("resize", reserveSpace);
  } catch (_) { /* consent UI must never break the page */ }
})();
