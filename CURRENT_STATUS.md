# CURRENT_STATUS — Plunge Picks

> מה עובד, מה חסר, ומהן המשימות הבאות. **המסמך הזה מתעדכן אחרי כל שינוי.**
> עדכון אחרון: 24 ביולי 2026.

---

## מצב כללי
האתר בנוי, מעוצב מחדש לפי המוקאפ, ותואם-אמינות. הבסיס עומד; נותרו תיקוני P0/P1 לפני השקעה בהבאת תנועה.

## מה עובד (חי באתר)
- עמוד בית חדש לפי המוקאפ (hero, מיני-Finder, Top-3, טבלת השוואה, אזור אמון, lead-gen, פוטר).
- Header ו-Footer אחידים על כל 20 העמודים.
- 4 כלים אינטראקטיביים — כולם נבדקו headless, ללא שגיאות Console:
  - Cost Calculator (נבדק: 4 מפגשים/שבוע → קרח $129.90/חודש, chiller $23.36/חודש, break-even 28 חודשים).
  - Comparison Builder (שיתוף דרך `?ids=`, "Not confirmed" לשדות ריקים).
  - Ice-vs-Chiller (כלי החלטה).
  - Product Finder (`find-my-plunge.html`) — ⚠️ ראה "חסר" למטה.
- עמודי קנייה: `best-cold-plunge-tubs.html` (7 דגמים), `best-budget-cold-plunge.html`.
- מדריך: `cold-plunge-beginners-guide.html`.
- Lead magnet: `buyer-checklist.html`.
- עמודי אמון/חוק: editorial-policy, corrections, contact, privacy, terms, affiliate-disclosure, product-testing, medical-disclaimer (⚠️ about + how-we-review — ראה "חסר").
- 404 מותאם.
- תאימות אמזון/FTC: משפט מדויק, גילוי, אין מחירים סטטיים, `rel` נכון.
- SEO: title/description ייחודיים, canonical, sitemap.xml, robots.txt, OG, JSON-LD אמיתי בלבד.
- אנליטיקס: תשתית `plungeTrack` מוכנה (לא פעילה — ממתין ל-GA4 ID).
- פינטרסט מאומת, 2 פינים חיים.
- משימה מתוזמנת שבועית: כל יום ראשון 17:00 (שעון ישראל) — מייצרת מאמר + 3 פינים + הודעת העלאה.

## מה חסר / שבור (עדיפות גבוהה)

### P0 — לתקן מיידית
- **3 קבצים מחזירים 404 באתר החי** (נכשלו בהעלאה ל-GitHub):
  - `find-my-plunge.html`
  - `about.html`
  - `how-we-review.html`
  - הקבצים מוכנים בצד קלוד; ממתינים להעלאה ידנית של בועז (Add file → Upload files).

### P1 — לפני הבאת תנועה
- **אימות נתוני מוצר** המסומנים `verify:true`: Hydragun Supertub, Polar Monkeys Brainpod 2.0, Nordic Wave Viking, The Cold Pod, Stock Tank (טמפ' מינ', מידות, משקל, אחריות, החזרה). ראה `PRODUCT_SOURCES.md`.
- **החלפת קישורי חיפוש גנריים** (Cold Pod, Stock Tank) ב-Special Links מדויקים דרך SiteStripe.
- **הפעלת GA4** (חסר Measurement ID) + Pinterest Tag + Search Console.
- **שם אמיתי לעמוד About** (כרגע placeholder עם TODO).

## המשימה הבאה (נקודת המשך)
1. השלמת העלאת 3 הקבצים החסרים (P0).
2. אחרי אישור GPT ל-QA — לעבור לאימות נתוני מוצר (P1) לפי `PRODUCT_SOURCES.md`.

## חסום / ממתין לבועז
- העלאת קבצים ל-GitHub (ידני).
- GA4 Measurement ID, Pinterest Tag ID, ספק מייל, אישורי תוכניות שותפים ישירות (Plunge/Sun Home/Hydragun — כרגע "pending").
- Amazon PA-API (דורש 3 מכירות ראשונות).
