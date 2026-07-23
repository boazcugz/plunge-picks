/* Plunge Picks — direct affiliate-program tracker.
   IMPORTANT: nothing here is assumed to be active or approved. Every record
   starts as "pending" until the operator applies and confirms terms in writing.
   Do NOT display commission rates or "approved" status publicly until verified.
   Update status + verifiedDate as you apply and get accepted. */
window.PLUNGE_AFFILIATE_PROGRAMS = [
  {
    brand: "Amazon",
    program: "Amazon Associates",
    network: "Amazon",
    applyUrl: "https://affiliate-program.amazon.com",
    applicationStatus: "approved",       // this one IS live: tag plungepicks-20
    approvalStatus: "approved",
    tag: "plungepicks-20",
    commissionRate: "varies by category (verify current rate card)",
    cookieWindow: "24 hours (90 days if added to cart)",
    notes: "Best used for accessories, filters, covers, thermometers, cleaning gear. 3 qualifying sales required within 180 days to remain active. PA-API (for prices/images) requires those sales first.",
    humanReview: "Replace generic search links with product-specific Special Links via SiteStripe.",
    verifiedDate: "2026-07"
  },
  {
    brand: "Plunge",
    program: "Plunge Partnerships",
    network: "unknown (verify)",
    applyUrl: "https://plunge.com/pages/partnerships",
    applicationStatus: "pending",
    approvalStatus: "not_applied",
    tag: null,
    commissionRate: null,
    cookieWindow: null,
    notes: "High-ticket ($5,000+). Apply and confirm terms before using an affiliate link — until then, link is a plain product link.",
    humanReview: "Apply; record commission %, cookie window, brand-asset and Pinterest rules.",
    verifiedDate: "2026-07"
  },
  {
    brand: "Sun Home Saunas",
    program: "Sun Home Affiliate",
    network: "Impact",
    applyUrl: "https://sunhomesaunas.com/pages/become-an-affiliate",
    applicationStatus: "pending",
    approvalStatus: "not_applied",
    tag: null,
    commissionRate: null,
    cookieWindow: null,
    notes: "Via Impact — requires a free Impact account. Premium products ($5,000–$10,000).",
    humanReview: "Apply through Impact; confirm terms.",
    verifiedDate: "2026-07"
  },
  {
    brand: "Hydragun",
    program: "Hydragun Affiliate",
    network: "unknown (verify)",
    applyUrl: "https://hydragun.com",
    applicationStatus: "pending",
    approvalStatus: "not_applied",
    tag: null, commissionRate: null, cookieWindow: null,
    notes: "Search 'Hydragun affiliate program' — confirm network and terms.",
    humanReview: "Locate program page; apply.",
    verifiedDate: "2026-07"
  },
  {
    brand: "The Cold Pod",
    program: "The Cold Pod Affiliate",
    network: "unknown (verify)",
    applyUrl: "https://thecoldpod.com",
    applicationStatus: "pending",
    approvalStatus: "not_applied",
    tag: null, commissionRate: null, cookieWindow: null,
    notes: "Budget product. May also be linked via Amazon in the meantime.",
    humanReview: "Check for a direct program; otherwise use Amazon Special Link.",
    verifiedDate: "2026-07"
  }
];
