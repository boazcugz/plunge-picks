/* ============================================================================
   PlungeWise — event tracking + shared UI behaviour.
   Implements MASTER_BRIEF_V2 §10.2 (click separation), §14 (accessibility),
   §16 (event taxonomy).

   PRIVACY (§16, non-negotiable):
   Never send an email address, a name, a phone number, free personal text, or
   any other PII into an event payload. Only the whitelisted parameters below
   are ever forwarded: page_slug, product_slug, merchant, cta_position,
   link_type, diy_path, price_category, affiliate_status.

   GA4 ACTIVATION (§22 — do NOT invent a Measurement ID):
   When Boaz supplies a real ID, add these two lines to <head> on every page,
   ABOVE the <script src="analytics.js"> include, replacing G-XXXXXXXXXX:

     <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
     <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
     gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>

   Until then every event no-ops safely. Set window.PLUNGE_DEBUG = true in the
   console to see what would have been sent.
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
      if (typeof window.gtag === "function") { window.gtag("event", event, params); }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(Object.assign({ event: event }, params));
      }
      if (window.PLUNGE_DEBUG) { console.log("[plungeTrack]", event, params); }
    } catch (e) { /* analytics must never break the page */ }
  };

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
})();
