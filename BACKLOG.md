# BACKLOG — PlungeWise

> כל המשימות לפי עדיפות. P0 קודם. משימה שמתחילים — מעבירים ל-`CURRENT_STATUS.md`.
> מסודר מחדש לפי `MASTER_BRIEF_V2.md` §19 + §24.
> עדכון אחרון: 26 ביולי 2026.

---

## P0 — תיקון מיידי
- [x] העלאת 3 הקבצים החסרים ל-GitHub (`find-my-plunge.html`, `about.html`, `how-we-review.html`). **נסגר 26/7.**

*אין פריטי P0 פתוחים.*

---

## Phase 0 — תיעוד (§19)
- [x] הוספת `MASTER_BRIEF_V2.md` ל-`/docs`.
- [x] עדכון `CURRENT_STATUS.md` למבנה Phase.
- [x] עדכון `BACKLOG.md` (המסמך הזה).
- [ ] Commit נפרד ל-GitHub. *חסום: העלאה ידנית של בועז.*

---

## Phase 1 — Production Trust Fix (§19, Acceptance §20)
- [x] 1. הסרת טופס המייל הלא פעיל מעמוד הבית → `Open the Free Buyer Checklist` → `buyer-checklist.html`.
- [x] 2. תיקון Event Tracking: `checklist_open` נמדד, `lead_signup` בוטל, `ice_vs_chiller_complete` הופרד מ-`cost_calculator_complete`.
- [x] 3. הפרדת `merchant_click` / `affiliate_click` / `amazon_affiliate_click` לפי `affiliate-programs.js`.
- [x] 4. ניקוי טענות מוצר לא מאומתות (§9.4) — noisy / snug / burns through ice וכו'.
- [x] 5. הסרת מחירי Amazon סטטיים (`under $200` ליד קישור אמזון).
- [x] 6. מקורות וניסוח מסויג לתוכן הבריאותי (`cold-plunge-beginners-guide.html`, `faq.html`) + סנכרון FAQPage JSON-LD.
- [x] 7. נגישות בסיסית: `:focus-visible`, `prefers-reduced-motion`, `aria-live`, `caption` + `scope="col"`, Escape לתפריט, `aria-expanded`, 320px.
- [x] 8. בדיקת Console וקישורים.
- [ ] העלאה ל-GitHub + QA של GPT. *חסום: בועז.*

---

## Phase 2 — DIY Category Foundation (§19, §7, Acceptance §21) — לא להתחיל לפני אישור
- [ ] יצירת `diy-cold-plunge.html` (Hub) עם תיבת שלושת המסלולים (§7.4).
- [ ] עדכון ניווט בכל העמודים — הוספת `DIY & Budget`, העברת `About Us` לפוטר (§7.2).
- [ ] אזור `Build It or Buy It` בעמוד הבית (§13).
- [ ] Breadcrumbs: `Home > DIY & Budget > DIY Ice Bath Ideas` ל-`diy-ice-bath-ideas.html` (§7.5).
- [ ] Internal Linking בין ה-Hub לכלים, ל-Best Cold Plunges ול-DIY Ideas.
- [ ] עדכון sitemap + canonical.

---

## Phase 3 — DIY Content Cluster (§7.6) — לא להתחיל לפני Phase 2
- [ ] `diy-vs-ready-made-cold-plunge.html`.
- [ ] `stock-tank-cold-plunge.html`.
- [ ] `diy-cold-plunge-filtration.html`.

---

## Phase 4 — Original Evidence (§19)
- [ ] מדידות אמיתיות ראשונות (טמפ' לאורך זמן, צריכת קרח, עלות חשמל).
- [ ] מעבר מוצר ראשון מ-Research-Based ל-Hands-On לפי תנאי §9.3.
- [ ] מיגרציה הדרגתית של `products.js` למבנה ראיות של §9.2 (Backward Compatible).

---

## P1 — חסום בבועז (לא תלוי Phase)
- [ ] אימות נתוני מוצר `verify:true` (Hydragun, Polar Monkeys, Nordic Wave, The Cold Pod, Stock Tank) — לפי `PRODUCT_SOURCES.md`.
- [ ] החלפת 5 קישורי חיפוש גנריים ב-Special Links דרך SiteStripe. *חסום: בועז מפיק את הקישורים.*
- [ ] הפעלת GA4 (הזרקת gtag.js עם Measurement ID). *חסום: חסר ID. מקום ההזרקה מתועד ב-`analytics.js`.*
- [ ] הוספת Pinterest Tag. *חסום: חסר Tag ID.*
- [ ] חיבור Search Console + הגשת sitemap.
- [ ] שם אמיתי לעמוד About. *חסום: החלטת בועז.*
- [ ] הרשמה ואישור לתוכניות שותפים ישירות (Plunge/Sun Home/Hydragun/Cold Pod). *חסום: בועז.*

---

## P2 — ביצועים ואיכות (§15)
- [ ] המרת JPG ל-WebP/AVIF עם fallback; `width`/`height` לתמונות; lazy-load מתחת לקפל.
- [ ] בדיקת משקל Hero (כרגע `hero.jpg` ≈ 300KB).
- [ ] Lighthouse Mobile לעמוד הבית, ל-DIY Hub ולעמוד השוואה.
- [ ] מעבר נגישות מלא: ניגודיות, alt, סדר פוקוס.
- [ ] חיזוק קישורים פנימיים בין עמודי תוכן/כלים.

---

## P3 — פיתוח עתידי (רק אחרי שהבסיס ממיר)
- [ ] כלי 5: Size/Height Matcher. *חסום: דורש מידות פנים מאומתות.*
- [ ] עמוד Outdoor / Backyard ice bath — פער שזוהה מול DexDecor (ראה `COMPETITORS.md`).
- [ ] עמודי מודל-מול-מודל נוספים: Sun Home מול Plunge, Ice Barrel מול stock tank.
- [ ] מוצרים שחסרים בקטלוג: Ice Barrel 400, Renu Therapy Cold Stoic 2.0, Edge Tub Elite.
- [ ] עמודי Best-X-for-Y (גובה/דירה/חוץ/ניידות).
- [ ] מאמרי בעלות (עלות קרח, תחזוקה, סינון, אחריות).
- [ ] מערכת מייל מלאה + רצף מיילים. *חסום: ספק מייל. עד אז — אין טופס מייל באתר (§10.1).*
- [x] דומיין מותאם `plungewise.com` — נרכש, חובר ומגיש את האתר. המיגרציה בקוד (canonical/sitemap/robots/OG/JSON-LD) בוצעה ב-PP-REBRAND-001 (26/7/2026).
- [ ] Amazon PA-API (מחירים/תמונות חוקיים). *חסום: דורש 3 מכירות ראשונות.*

---

## חסום — ממתין לבועז (ריכוז)
העלאת קבצים ל-GitHub · GA4 ID · Pinterest Tag ID · Special Links · ספק מייל · שם About · רכישת דומיין · אישורי תוכניות שותפים.
