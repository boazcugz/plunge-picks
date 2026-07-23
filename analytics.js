/* Plunge Picks — privacy-conscious event tracking scaffold.
   No personal data is ever collected here. Events forward to GA4 (gtag)
   or a dataLayer if present; otherwise they no-op safely.
   To activate GA4: add the gtag.js snippet with your Measurement ID in <head>. */
(function () {
  window.plungeTrack = function (event, params) {
    params = params || {};
    try {
      if (typeof window.gtag === "function") { window.gtag("event", event, params); }
      if (Array.isArray(window.dataLayer)) { window.dataLayer.push(Object.assign({ event: event }, params)); }
      // Visible in console during setup; harmless in production.
      if (window.PLUNGE_DEBUG) { console.log("[plungeTrack]", event, params); }
    } catch (e) { /* never break the page for analytics */ }
  };

  // Auto-track affiliate CTA clicks (affiliate links carry rel="sponsored").
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[rel*="sponsored"]') : null;
    if (!a) return;
    var host = "";
    try { host = new URL(a.href).hostname.replace(/^www\./, ""); } catch (_) {}
    window.plungeTrack("affiliate_click", {
      merchant: a.getAttribute("data-merchant") || host,
      product_slug: a.getAttribute("data-product") || "",
      page_slug: location.pathname,
      cta_position: a.getAttribute("data-pos") || "",
      link_type: host.indexOf("amazon") > -1 ? "amazon" : "brand"
    });
  }, true);
})();

/* Mobile nav toggle (shared header) */
(function(){
  document.addEventListener("click",function(e){
    var b=e.target.closest && e.target.closest("#burger");
    if(!b) return;
    var links=document.getElementById("navlinks");
    if(!links) return;
    var open=links.classList.toggle("open");
    b.setAttribute("aria-expanded", open?"true":"false");
  });
})();
