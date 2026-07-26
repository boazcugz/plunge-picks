# CURRENT_STATUS — PlungeWise

> מה עובד, מה חסר, ומהן המשימות הבאות. **המסמך הזה מתעדכן אחרי כל שינוי.**
> עדכון אחרון: 26 ביולי 2026. Phase 0, Phase 1 והמיתוג מחדש חיים. **Phase 2 + PW-REBRAND-BASE הושלמו בקוד ועברו QA מקומי — ממתינים להעלאה אחת ל-GitHub.**

## שדרוג העיצוב — מפת שלבים
| שלב | תיאור | סטטוס |
|---|---|---|
| PW-REBRAND-BASE | ניקוי מותג, דומיין, redirects, מבנה `/assets`, לוגו טקסטואלי | ✅ הושלם בקוד 26/7 |
| PW-BRAND-ASSETS | הכנסת חבילת התמונות הסופית | ⏸ ממתין לחבילה מבועז |

**נקודת ההחלפה של הלוגו** מתועדת ב-`assets/README.md`: מחליפים רק את ה-`<svg>` בתוך `<a class="brand">`, ומשאירים את `<span class="wm">PLUNGE<b>WISE</b></span>` כטקסט אמיתי. שם המותג לא הופך לתמונה.

**`_redirects`** — קובץ חדש שכופה 301 מ-`plunge-picks.netlify.app`, מ-`www` ומ-HTTP אל `https://plungewise.com`. נוצר אחרי שבדיקה חיה גילתה שכתובת ה-Netlify מגישה את האתר במקום להפנות.

---

## מסמך ההפעלה הפעיל
**`docs/MASTER_BRIEF_V2.md`** (26 ביולי 2026) הוא המסמך המחייב. הוא גובר על כל הנחיה קודמת.
`PROJECT_MASTER.md` נשאר כרקע היסטורי בלבד. `WORK_PROTOCOL.md` ממשיך לחול על אופן העבודה השוטף.

## מותג ודומיין (עודכן 26/7/2026 — PP-REBRAND-001)
| | |
|---|---|
| שם מותג | **PlungeWise** (לשעבר Plunge Picks) |
| סלוגן | Buy It. Build It. Plunge Wise. |
| דומיין ראשי | https://plungewise.com — פעיל, מחובר ל-Netlify |
| כתובת Netlify | https://plunge-picks.netlify.app — עדיין פעילה, לא שונתה |
| שם repo ב-GitHub | `plunge-picks` — **לא שונה** (לפי הנחיית הבטיחות במשימה) |
| מזהה שותף אמזון | `plungepicks-20` — **לא שונה** |
| מייל | plungepicks@gmail.com — **לא שונה** עד שתהיה כתובת חדשה פעילה |
| פינטרסט | pinterest.com/**plungewise** — ✅ הושלם 26.07.2026: 23 הקישורים באתר עודכנו ועלו ל-main, שם המשתמש בפינטרסט שונה, והדומיין plungewise.com נתבע ואומת (תג `p:domain_verify` קיים ב-8 עמודים). |

## מצב כללי
האתר בנוי (**24 עמודים** — 23 חיים + `diy-cold-plunge.html` שממתין להעלאה), מעוצב לפי המוקאפ, ותואם-אמינות ברמת בסיס.
הניווט הראשי כעת: `Best Cold Plunges · Comparisons · DIY & Budget · Guides · Calculator · Find My Cold Plunge`. About Us עבר מהניווט לפוטר בלבד.
המיצוב החדש: *"Find the right way to cold plunge — buy a complete system, build your own, or start with a simple ice-based setup."*
DIY & Budget **הפך לקטגוריה ראשית** (Phase 2 הושלם), ו-`diy-ice-bath-ideas.html` הפך לעמוד-בן שלו.

## מה עובד (חי באתר)
- עמוד בית לפי המוקאפ (hero, מיני-Finder, Top-3, טבלת השוואה, Guides & Comparisons, אזור אמון, פוטר).
- Header ו-Footer אחידים על כל העמודים.
- 4 כלים אינטראקטיביים, כולם נבדקו headless ללא שגיאות Console:
  Cost Calculator, Comparison Builder, Ice-vs-Chiller, Product Finder.
- עמודי קנייה: `best-cold-plunge-tubs.html` (7 דגמים), `best-budget-cold-plunge.html`.
- מדריכים: `cold-plunge-beginners-guide.html`, `faq.html` (19 שאלות + FAQPage), `plunge-vs-ice-barrel.html`, `diy-ice-bath-ideas.html`.
- Lead magnet: `buyer-checklist.html` (להדפסה/PDF, ללא איסוף מייל).
- עמודי אמון/חוק: about, how-we-review, editorial-policy, corrections, contact, privacy, terms, affiliate-disclosure, product-testing, medical-disclaimer.
- **Hub של DIY & Budget: `diy-cold-plunge.html`** — קופסת ההחלטה "Build It or Buy It?" עם שלושה מסלולים (ice / chiller / ready-made), 7 מאפייני השוואה לכל מסלול, ללא מספרי מחיר, וגבול ברור בנושא חשמל (אין הוראות חיווט).
- 404 מותאם. SEO: canonical, sitemap (23 כתובות), robots, OG, JSON-LD אמיתי בלבד.
- תאימות אמזון/FTC: משפט מדויק, גילוי בראש כל עמוד מסחרי, `rel="sponsored nofollow noopener"`.
- פינטרסט מאומת, 2 פינים חיים. משימה מתוזמנת שבועית (ראשון 17:00 שעון ישראל).

## סטטוס Phase לפי MASTER_BRIEF v2.0 §19

| Phase | תיאור | סטטוס |
|---|---|---|
| Phase 0 | תיעוד — הוספת המסמך ל-`/docs`, עדכון STATUS ו-BACKLOG | ✅ הושלם 26/7 |
| Phase 1 | Production Trust Fix (8 סעיפים) | ✅ הושלם, עלה ואומת חי 26/7 |
| Phase 2 | DIY Category Foundation (`diy-cold-plunge.html`, ניווט, Build It or Buy It) | ✅ הושלם בקוד 26/7 — עבר QA מקומי, ממתין להעלאה |
| Phase 3 | DIY Content Cluster (`diy-vs-ready-made-cold-plunge`, `stock-tank-cold-plunge`, `diy-cold-plunge-filtration`) | ⏸ הבא בתור — אחרי אישור בועז ל-Phase 2 |
| Phase 4 | Original Evidence | ⏸ לא התחיל |
| Phase 5 | Growth | ⏸ לא התחיל |

## מה חסר / שבור (עדיפות גבוהה)

### P0 — ✅ נסגר 26/7/2026
שלושת ה-404 (`find-my-plunge.html`, `about.html`, `how-we-review.html`) עלו ואומתו חיים.
אין כרגע פריטי P0 פתוחים.

### P1 — לפני הרחבת DIY (= Phase 1) — ✅ כל 8 הסעיפים נסגרו בקוד 26/7
1. ✅ אין טופס מייל באתר. הכפתור מוביל ל-`buyer-checklist.html`.
2. ✅ `checklist_open` ו-`ice_vs_chiller_complete` פועלים. `lead_signup` בוטל לחלוטין.
3. ✅ הפרדת `merchant_click` / `affiliate_click` / `amazon_affiliate_click` — אומתה בזמן ריצה.
4. ✅ סריקת §9.4 הושלמה בכל עמודי המוצר וב-`products.js`.
5. ✅ אין מחיר אמזון סטטי ליד קישור. `under $200` הוסר.
6. ✅ 5 מקורות + הפרדת Common practice / Evidence בשני עמודי הבריאות.
7. ✅ `:focus-visible`, `prefers-reduced-motion`, `aria-live`, `caption`+`scope`, Escape, 320px — 23/23 עמודים.
8. ✅ 0 שגיאות Console, 0 קישורים שבורים (Playwright, 23 עמודים, 320px + 1280px).

**skip links — ✅ נסגר ב-Phase 2 (26/7).** תיקון לדיווח קודם: בסיכום Phase 1 נכתב "skip links ×5", אבל ביקורת לפי-קובץ הראתה 0/23 — המחלקה הייתה ב-CSS ואף עמוד לא השתמש בה. כעת 24/24 עמודים עם `<a class="skip-link">` ויעד `id="main"`, ואומת ב-Playwright שהקישור הוא תחנת ה-Tab הראשונה.

**נותר פתוח מ-§14:** תוויות גלויות היכן שקיים רק `aria-label`.

### P1 — חסום בבועז
- **אימות נתוני מוצר** המסומנים `verify:true`: Hydragun Supertub, Polar Monkeys Brainpod 2.0, Nordic Wave Viking, The Cold Pod, Stock Tank. ראה `PRODUCT_SOURCES.md`.
- **החלפת קישורי חיפוש גנריים** ב-Special Links מדויקים דרך SiteStripe (5 קישורים).
- **הפעלת GA4** (חסר Measurement ID) + Pinterest Tag + Search Console.
- **שם אמיתי לעמוד About** (כרגע placeholder עם TODO).

## מצב תוכניות שותפים (מקור אמת: `affiliate-programs.js`)

| מותג | סטטוס | Tag | סוג אירוע |
|---|---|---|---|
| Amazon | ✅ approved | `plungepicks-20` | `amazon_affiliate_click` |
| Plunge | pending / not_applied | — | `merchant_click` |
| Sun Home Saunas | pending / not_applied | — | `merchant_click` |
| Hydragun | pending / not_applied | — | `merchant_click` |
| The Cold Pod | pending / not_applied | — | `merchant_click` |
| Ice Barrel | לא נבדק | — | `merchant_click` |
| Polar Monkeys / Nordic Wave | לא נבדק | — | `merchant_click` |

**`affiliate_click` אינו בשימוש כרגע** — אין אף תוכנית ישירה מאושרת. הוא ייכנס לפעולה רק כשבועז יאשר תוכנית ויעדכן את `affiliate-programs.js`.

## ✅ העלאת 26/7 — הושלמה ואומתה
10 קבצים עלו ב-commit אחד. אומת: כל 10 קיימים ב-GitHub וזהים בייט-בבייט למקור, ו-Netlify פרס אותם (המכסה התאפסה).
- חדשים: `about.html`, `how-we-review.html`, `find-my-plunge.html`, `plunge-vs-ice-barrel.html`, `faq.html`, `diy-ice-bath-ideas.html`.
- מעודכנים: `sitemap.xml` (22 כתובות), `index.html`, `best-cold-plunge-tubs.html`, `best-budget-cold-plunge.html`.
- **האתר עלה מ-20 ל-23 עמודים חיים. אין יותר 404 ידועים.**

## המשימה הבאה (נקודת המשך)
1. **העלאת חבילת Phase 2 ל-GitHub** (ידני, בועז): 24 קובצי HTML, `style.css`, `analytics.js`, `sitemap.xml`.
2. אימות אחרי ה-deploy: `https://plungewise.com/diy-cold-plunge.html` נטען, הניווט החדש מופיע בכל עמוד, וקופסת ההחלטה נראית תקין במובייל.
3. QA של GPT על Phase 2 לפי §21 Acceptance Criteria + אישור בועז.
4. הגשת ה-sitemap המעודכן ב-Search Console אחרי ההעלאה.
5. רק אחרי אישור — Phase 3 (שלושת מאמרי ה-DIY).

## Analytics — אירועי DIY שנוספו (Phase 2)
| אירוע | מתי | פרמטרים |
|---|---|---|
| `diy_path_selected` | בחירת מסלול בקופסת ההחלטה (Hub או עמוד הבית) | `diy_path`: `ice_starter` / `diy_chiller` / `ready_made`, `cta_position` |
| `diy_component_click` | קליק על רכיב בנייה או על כלי תמחור מתוך מסלול | `product_slug`, `diy_path`, `cta_position` |
| `diy_to_ready_made_click` | קורא DIY שחוצה למערכת מוכנה — המדד לשאלה אם ה-Hub מזין או אוכל את הצד היקר | `cta_position` |

**כפילות מכוונת:** קישור אמזון של רכיב מפעיל גם `diy_component_click` וגם `amazon_affiliate_click`. שני אירועים שמודדים דברים שונים — **אין לסכם ביניהם**. ייחוס הכנסה = `amazon_affiliate_click` בלבד.

## חסום / ממתין לבועז
- העלאת קבצים ל-GitHub (ידני — לקלוד אין הרשאת כתיבה, ו-GitHub API חסום בסביבה).
- GA4 Measurement ID (מקום ההזרקה מתועד ב-`analytics.js`), Pinterest Tag ID.
- ספק מייל (עד אז — אין טופס מייל באתר).
- אישורי תוכניות שותפים ישירות (Plunge / Sun Home / Hydragun / Cold Pod).
- Amazon Special Links דרך SiteStripe.
- Amazon PA-API (דורש 3 מכירות ראשונות).
- שם אמיתי לעמוד About.
