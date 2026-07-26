# CHANGELOG — PlungeWise

> כל שינוי מהותי, מהחדש לישן. פורמט: `[תאריך] — כותרת` + קבצים שהשתנו.
> החל מגרסת הפרוטוקול, כל מסירה מקלוד מוסיפה כאן רשומה.

---

## [2026-07-26] — PW-REBRAND-BASE: השלמת בסיס המיתוג לפני שדרוג העיצוב

שלב ראשון מתוך שדרוג העיצוב המדורג. **ללא Redesign, ללא תמונות חדשות, ללא שינוי בפריסה.** המטרה: לוודא שהבסיס הטקסטואלי, הדומיין והמבנה נקיים לפני ש-PW-BRAND-ASSETS יכניס את חבילת התמונות.

**ביקורת מותג — 30 מופעים של המחרוזת הישנה בקבצי האתר, מסווגים במלואם**
- 24 × `plungepicks-20` — תג השותפים של אמזון. **נשאר בכוונה**, לפי מגבלת הבטיחות מ-PP-REBRAND-001. שינוי התג מנתק את ייחוס העמלות.
- 4 × `plungepicks@gmail.com` — **נשאר בכוונה** עד שתהיה כתובת חדשה פעילה.
- 2 × פרוזה גלויה — **תוקנו** (ראה למטה).
- 0 מופעים בקישורי GitHub, 0 בכתובות Netlify, 0 בטקסט מותג גלוי אחרי התיקון.

**תוקן — שתי מחרוזות פרוזה שקראו כמו המותג הישן**
- `diy-cold-plunge.html`: `See our best cold plunge picks →` → `See our best cold plunges →`
- `diy-ice-bath-ideas.html`: `best budget cold plunge picks` → `best budget cold plunges`
אלה לא היו תוצאה של החלפה אוטומטית שגויה — זו פרוזה אנגלית תקינה שנכתבה כשהמותג עוד נקרא Plunge Picks, ולכן קראה כהפניה למותג. אחרי התיקון: **0 מופעים של `plunge picks` כטקסט גלוי בכל האתר.**

**אומת — שכבת הדומיין נקייה ב-24/24 העמודים**
נסרקה כל כתובת מוחלטת בכל עמוד. `canonical` יחיד ותואם לשם הקובץ בכל עמוד, `og:url`, `og:image`, `twitter:image`, וכל כתובת בתוך בלוקי JSON-LD (`@id`, `url`, `logo`, `image`, `mainEntityOfPage`) — כולם על `https://plungewise.com`. **0 חריגות.** `sitemap.xml`: 23 כתובות, כולן על הדומיין הנכון. `robots.txt` מפנה ל-`https://plungewise.com/sitemap.xml`.
23 הכתובות החיצוניות שנמצאו בסריקה הן ספקים (plunge.com, hydragun.com, icebarrel.com ועוד) ומקורות רפואיים (PubMed, RNLI) — תקינות, לא קשורות למותג.

**נוצר — `_redirects` (קובץ חדש, הממצא המשמעותי של השלב הזה)**
בדיקה חיה גילתה ש-`https://plunge-picks.netlify.app` **מגיש את האתר במלואו** ולא מפנה ל-`plungewise.com`. תג ה-canonical מצביע נכון, אבל canonical הוא רמז לגוגל, לא הוראה — שני שמות דומיין הגישו את אותו תוכן בפועל. הקובץ כופה 301 מכתובת ה-Netlify, מ-`www`, ומ-HTTP אל `https://plungewise.com`, עם `:splat` שמשמר את הנתיב.

**נוצר — מבנה `/assets`**
`assets/brand/`, `assets/home/`, `assets/diy/`, `assets/pinterest/` — ריקות בכוונה, כל אחת עם `README.md` ו-`.gitkeep`. `assets/README.md` מגדיר את כללי השמות והפורמטים, ומתעד במפורש את **נקודת ההחלפה של הלוגו** ל-PW-BRAND-ASSETS: מחליפים רק את ה-`<svg>` בתוך `<a class="brand">`, ומשאירים את `<span class="wm">PLUNGE<b>WISE</b></span>` כטקסט.

**לוגו — טקסטואלי בלבד, אומת**
`PLUNGEWISE` מרונדר כטקסט אמיתי ב-1280px, 360px ו-320px, עם **0 תגי `<img>` בתוך אזור הלוגו**. אין שימוש בתמונת הקונספט כלוגו, ולא נחתך ממנה דבר. שם המותג נשאר טקסט ולא הופך לתמונה — בשביל SEO, בשביל קוראי מסך, ובשביל שהאתר לא יישבר כשתמונה לא נטענת.

**ניווט** — `DIY & Budget` קיים ב-24/24 העמודים במקום השלישי, עם `aria-current="page"` בעמוד שלו. (נוסף ב-Phase 2, אומת מחדש כאן.)

**בדיקות:** Playwright על 16 עמודים — 0 שגיאות Console, 0 עמודים עם גלילה אופקית ב-320px. 782 קישורים פנימיים — 0 שבורים.

**פער ידוע:** האתר החי עדיין מציג את הניווט הישן ואת `Top Cold PlungeWise for 2026`, כי חבילת Phase 2 טרם הועלתה ל-GitHub. שתי התקלות מתוקנות בקוד המקומי ויירדו עם ההעלאה.

## [2026-07-26] — Phase 2: DIY & Budget הופך לקטגוריה ראשית

**נוצר — `diy-cold-plunge.html` (29,506 בתים)**
עמוד ה-Hub של הקטגוריה, לפי §7.3–§7.4 של MASTER_BRIEF v2.0. זהו עמוד **החלטה**, לא עוד רשימת רעיונות — התוכן הקיים ב-`diy-ice-bath-ideas.html` נשאר במקומו והפך לעמוד-בן.
- H1: `DIY Cold Plunge & Budget Ice Bath Solutions`. Title: `DIY Cold Plunge & Budget Ice Bath Guide | PlungeWise`.
- **קופסת ההחלטה "Build It or Buy It?"** — שלושה מסלולים זה לצד זה, כל אחד עם שבעת המאפיינים שדורש §7.4: עלות ראשונית, מאמץ שוטף, שליטה בטמפרטורה, תחזוקה, ניידות, מסלול שדרוג, והמגבלה המרכזית.
  - Path A — Start cheap with ice (`ice_starter`): ארבעה כיווני מימוש — חבית מתנפחת, סטוק-טנק מגולוון, האמבטיה הקיימת, ומיכל/ארגז.
  - Path B — Build a chiller system (`diy_chiller`): שבעה רכיבים — אמבט, צ'ילר, משאבה, סינון, צנרת ומחברים, ניקוז, וחשמל.
  - Path C — Buy a ready-made plunge (`ready_made`): מפנה ל-`best-cold-plunge-tubs.html` ול-`find-my-plunge.html`.
- **הרכיב השביעי ב-Path B הוא היחיד ללא קישור, ובכוונה.** PlungeWise אינה מפרסמת הוראות חיווט. במקום זאת מופיע גבול ברור: כל רכיב מחושמל חייב לצאת משקע מוגן GFCI, ארונות חשמל חייבים להיות מדורגים לחוץ, אין להשתמש בכבל מאריך כפתרון קבע, וכל בנייה שדורשת מעגל חדש או שינוי בחשמל הבית מחייבת חשמלאי מוסמך. הפסקה גם אומרת לקורא לחשוד בכל מדריך DIY שכן מפרסם הוראות כאלה.
- **ללא מספרי מחיר בכל העמוד** (אומת: 0 מופעי `$` בטקסט). עלות ראשונית מבוטאת כקטגוריה — Lowest / Middle / Highest — וכל שאר השורות כתיאור של תמורה. נוספה פסקת מתודולוגיה מפורשת: PlungeWise לא בדקה פיזית את ההרכבות האלה ולא הריצה מדידות מבוקרות של הפשרת קרח או עלות הפעלה, והקורא מופנה ל-Cost Calculator כדי לייצר את המספרים שלו.

**עודכן — ניווט ראשי ב-24 העמודים**
`Best Cold Plunges · Comparisons · DIY & Budget · Guides · Calculator · Find My Cold Plunge`.
DIY & Budget נכנס כפריט קבוע במקום השלישי. About Us הוסר מהניווט העליון (0/24) ונשמר במלואו בפוטר (24/24). כל עמוד מסמן את הפריט הפעיל שלו ב-`aria-current="page"`.
בלוק הניווט הישן היה זהה בית-בית ב-23 העמודים — אומת לפני השינוי — ולכן הוחלף במעבר סקריפטי אחד, על עותק גיבוי שנשמר מראש.

**תוקן — פער נגישות שנותר פתוח מ-Phase 1**
בדיווח Phase 1 נכתב "skip links ×5". ביקורת לפי-קובץ הראתה שזה **לא היה נכון**: המחלקה `.skip-link` הייתה קיימת ב-`style.css`, אבל אף עמוד לא השתמש בה בפועל (0/23). בגלגול הזה נוסף `<a class="skip-link" href="#main">` מיד אחרי `<body>` ו-`<div id="main" tabindex="-1">` מיד אחרי `</header>` ב-**24/24 העמודים**. אומת ב-Playwright: הקישור הוא תחנת ה-Tab הראשונה בכל עמוד שנבדק.

**עודכן — `index.html`**
- נוסף אזור **"Build It or Buy It?"** לפני Guides & Comparisons — גרסה מקוצרת של קופסת ההחלטה, שמקשרת ישירות ל-`diy-cold-plunge.html#path-a/#path-b/#path-c`, עם הערת מתודולוגיה שמפנה ל-Cost Calculator.
- תוקנה שארית מ-PP-REBRAND-001: `Top Cold PlungeWise for 2026` → `Top Cold Plunges for 2026`. חיפוש סייטווייד אישר שזה היה המופע היחיד.

**עודכן — `diy-ice-bath-ideas.html` הפך לעמוד-בן של ה-Hub (§7.5)**
פירורי הלחם הגלויים ו-`BreadcrumbList` שונו מ-`Home › Guides › …` ל-`Home › DIY & Budget › DIY Ice Bath Ideas`. נוספה הפניה בראש העמוד למי שעדיין לא החליט אם DIY הוא בכלל המסלול הנכון, והקאלאאוט הסוגר הורחב עם קישורים ל-Hub, ל-Best Cold Plunges ול-Product Finder.

**עודכן — קישור פנימי דו-כיווני**
`cost-calculator.html`, `ice-vs-chiller.html`, `best-budget-cold-plunge.html`, `best-cold-plunge-tubs.html`, `find-my-plunge.html` — כולם מקבלים כניסה ויציאה מול ה-Hub. סה"כ 782 קישורים פנימיים ב-24 העמודים, 0 שבורים, 30 עוגנים פנימיים, כולם מתאימים ל-`id` קיים.

**עודכן — `style.css` (495 → 567 שורות, תוספת בלבד)**
בלוק חדש ל-Hub. אף כלל קיים לא שונה, ואף טוקן עיצוב, צבע או טיפוגרפיה לא נגעו. הכלל היחיד שנדרש כמוצא הוא `.article .wrap.wide { max-width: var(--max); }` — `.article .wrap` מוגבל ל-760px, מה שהיה דוחס שלושה כרטיסי החלטה לכ-228px כל אחד. השימוש ב-`wide` מוגבל לקופסת ההחלטה בלבד.

**עודכן — `analytics.js` (הערות בלבד, ללא שינוי לוגי)**
תועדו שלושת אירועי המשפך של ה-DIY: `diy_path_selected` (בחירת מסלול), `diy_component_click` (קליק על רכיב בנייה או על כלי תמחור מתוך מסלול), ו-`diy_to_ready_made_click` (קורא DIY שחוצה למערכת מוכנה — המספר שיגיד אם ה-Hub מזין את הצד היקר או אוכל אותו). תועדה גם כפילות מכוונת: קישור אמזון של רכיב נושא גם `data-plunge-event` וגם את מאפייני השותפים, ולכן קליק אחד מפעיל `diy_component_click` **וגם** `amazon_affiliate_click`. אלה שני אירועים שמודדים דברים שונים — התנהגות במשפך מול קליק שותפים — **ואין לסכם ביניהם**. ייחוס הכנסה משתמש ב-`amazon_affiliate_click` בלבד.

**עודכן — `sitemap.xml`** — נוסף `diy-cold-plunge.html` בעדיפות 0.9; `lastmod` רועננו ל-2026-07-26. 23 כתובות, שוות בדיוק ל-24 קבצי ה-HTML פחות `404.html`. אומת בשני הכיוונים: אין כתובת במפה שאין לה קובץ, ואין קובץ שחסר במפה.

**בדיקות שהורצו**
- Playwright headless, 16 עמודים (כולל ה-Hub): **0 שגיאות Console, 0 עמודים עם גלילה אופקית ב-320px.**
- ה-Hub ב-320px: חריגה אופקית 0px. קופסת ההחלטה: 3 עמודות בדסקטופ, עמודה אחת במובייל.
- תפריט מובייל: `aria-expanded` עובר false→true בפתיחה וחוזר ל-false ב-Escape.
- 20 קישורי אמזון באתר: 20/20 עם `rel="sponsored nofollow noopener"`, `target="_blank"` ו-`tag=plungepicks-20`. 0 חריגות.
- 24/24 עמודים: `<h1>` יחיד, `lang="en"`, כל `<img>` עם `alt`, canonical (למעט 404), meta description (למעט 404), JSON-LD תקין. 0 סכמות `Review`/`AggregateRating`/`Product`.
- טבלאות: `caption` ו-`scope="col"` בכל הטבלאות הקיימות.
- 0 שאריות `Plunge Picks` / `plunge-picks.netlify.app` בכל קבצי האתר.

**`email_signup_success` — לא קיים באתר, וזה נכון.** Phase 1 הסיר את טופס המייל המת, ו-§10.1/§22 אוסרים להחזיר אותו עד שיחובר ספק מייל אמיתי עם double opt-in. זו לא נסיגה.

**לא שונה:** פלטת הצבעים, הטיפוגרפיה, הפריסה, הארכיטקטורה, שמות קבצי ה-HTML, תג השותפים `plungepicks-20`, `plungepicks@gmail.com`, שם ה-repo, ושם פרויקט Netlify.

## [2026-07-26] — מעבר סופי לשם הפרופיל plungewise בפינטרסט

**23 עמודי HTML** — `https://pinterest.com/plungepicks` → `https://pinterest.com/plungewise` (מופע אחד בכל עמוד, בקישור החברתי שבפוטר). זהו הפריט האחרון מרשימת "נשאר בכוונה עם המותג הישן" ברשומת PP-REBRAND-001; בועז אישר מעבר סופי ל-plungewise.

**סיווג לפני שינוי:** 44 מופעים של המחרוזת `plungepicks` בקבצי האתר, בשלושה הקשרים בלבד — 23 קישורי פינטרסט (שונו), 17 מופעים של תג השותפים `plungepicks-20` (לא נגעו), 4 מופעים של `plungepicks@gmail.com` (לא נגעו, ממתין לכתובת חדשה). אחרי השינוי: 0 קישורי פינטרסט ישנים, 17 תג, 4 מייל — ללא סטייה.

**לא שונה:** אף טקסט גלוי. הקישור הוא אייקון עם `aria-label="Pinterest"` בלבד, ללא שם משתמש מוצג, ולכן אין שינוי ויזואלי בשום עמוד. `style.css`, התמונות והסכמות לא נגעו.

**`pins/טקסטים-לפינים.md`** — עודכן: שם הפרופיל הנדרש הוא plungewise, ונוסף לוח העלאה מומלץ לתשעה ימים לשישה הפינים.

**תלות שדורשת פעולה של בועז:** יש לשנות את שם המשתמש בפינטרסט ל-plungewise. עד שזה ייעשה, 23 הקישורים באתר יובילו לפרופיל שאינו קיים.

## [2026-07-26] — פינים חדשים ל-DIY + יישור נוסח המחירים בפינים 1–2

**נוצרו — 3 פינים חדשים למאמר `diy-ice-bath-ideas.html`** (1000×1500, אותה שפה חזותית של האתר: `#0d1b2a`, `#2ec4d4`, `#f4a63b`, Liberation Sans/Arial):
- `pins/pin4.png` — "9 DIY Ice Bath Ideas That Actually Work". רשת 3×3 של תשעת הרעיונות שמופיעים בפועל במאמר, ממוספרים 01–09. פין מסוג רשימה ממוספרת — הפורמט החזק ביותר בפינטרסט בקטגוריית DIY.
- `pins/pin5.png` — "The stock tank ice bath". פין ממוקד ברעיון הראשון במאמר, עם איור סטוק-טנק וכרטיס של שלוש שורות (למה בוחרים בו / מה נדרש להקים / מה החיסרון הכן). **בכוונה ללא מספר מחיר** — המאמר מסמן את הסטוק-טנק כ-"Budget" בלי טווח מאומת.
- `pins/pin6.png` — "Build it or buy it?" — השוואה דו-טורית בין בנייה עצמית לקנייה, עם שורת מסקנה. מכין את הקרקע ל-Phase 2 (DIY Hub).

**עודכנו — יישור נוסח המחירים לנתוני עמודי היעד (§10.3)**
- `pins/pin1.png`: הטקסט `From a $200 starter barrel to a $9,000 chiller system` הוחלף ב-`7 tubs compared — from a simple stock tank to a full chiller system`; שורת `Best Budget — start for under $200` הוחלפה ב-`Best Budget — real cold, no chiller price`. הטענה `under $200` לא נתמכה בעמוד היעד.
- `pins/pin2.png`: הכותרת `Start cold plunging for under $200` → `under $500`, בהתאמה מלאה לכותרת עמוד היעד `Best Budget Cold Plunge Tubs Under $500 (2026)`. שורת ההשוואה בכרטיס סומנה `Up-front cost (est. range) — $100–$300 vs $3,000+`, בהתאם לטווח המסומן `Typical estimated range` שמופיע באתר. תוקן גם קו חוצה שגוי על המילה `don't` שהפך את משמעות המשפט.
- `pins/pin1.png`, `pin4.png`: אייקון פתית השלג שורטט מחדש כפתית 6-זרועות (הגרסה הקודמת נראתה כאייקון חצים).

**עודכן — `pins/טקסטים-לפינים.md`**
- נוספו Title / Description / Destination link לשלושת פיני ה-DIY (כולם מפנים ל-`https://plungewise.com/diy-ice-bath-ideas.html`).
- כותרת פין 2 עודכנה מ-`Under $200 Works` ל-`Under $500 Works`; תיאור פין 1 כבר לא מבטיח "real prices".
- נוספה המלצה לשני לוחות נפרדים ב-Pinterest וסדר העלאה מומלץ.

**בדיקות:** חמשת הפינים רונדרו ב-Chromium headless ב-1000×1500 ונבדקו אוטומטית לחריגה מהמסגרת ולחפיפה בין אלמנטים — כולם `CLEAN`. כל אחד נבדק גם ויזואלית.

**לא שונה:** אף עמוד HTML, `style.css`, `pin3.png`, וכל שאר נכסי האתר.

## [2026-07-26] — PP-REBRAND-001: מיתוג מחדש מ-Plunge Picks ל-PlungeWise

**מותג:** PlungeWise · **דומיין:** https://plungewise.com · **סלוגן:** Buy It. Build It. Plunge Wise.
ללא שינוי בעיצוב, בארכיטקטורה, בפלטת הצבעים, בטיפוגרפיה או בשמות קבצי ה-HTML.

**שם המותג הגלוי (23 עמודים)**
- לוגו בהדר: `PLUNGE<b>PICKS</b>` → `PLUNGE<b>WISE</b>`, עטוף ב-`<span class="wm">` כדי ש-`gap` של ה-flex לא יפצל את המילה. נבדק: ה-innerText מרונדר `PLUNGEWISE` ב-1280px וב-360px.
- `aria-label="Plunge Picks home"` → `aria-label="PlungeWise home"`.
- פוטר: `PLUNGE PICKS` → `PLUNGEWISE`; **נוסף הסלוגן** `Buy It. Build It. Plunge Wise.` מתחת ללוגו, והמשפט התיאורי הקיים נשמר במלואו.
- קופירייט: `© 2026 PlungeWise. As an Amazon Associate I earn from qualifying purchases.` — צורה אחת בלבד ב-23/23 עמודים.
- 23 תגי `<title>`, 23 `meta description`, כל תגי Open Graph, וכל גופי עמודי האמון והמשפט (about, contact, how-we-review, editorial-policy, corrections, privacy, terms, affiliate-disclosure, product-testing, medical-disclaimer).
- `products.js`, `analytics.js`, `affiliate-programs.js` — שם המותג בהערות ובמחרוזות `not independently confirmed by…`.

**מטא-דאטה ו-Schema**
- הושלמו תגי Twitter: נוספו `twitter:title`, `twitter:description`, `twitter:image` ב-23 עמודים (קודם היה רק `twitter:card`).
- `Organization` ו-`WebSite`: `name` → PlungeWise, `@id`/`url` → `https://plungewise.com`, `logo` → `logo-square.png`.
- 5 בלוקי `Article`: `author`, `publisher`, `publisher.logo`, `mainEntityOfPage`, `image` — כולם על הדומיין החדש.
- אומת: 0 בלוקי JSON-LD לא-תקינים ב-23 העמודים.

**דומיין (הדומיין אומת כפעיל ומגיש את האתר לפני השינוי)**
- `plunge-picks.netlify.app` → `plungewise.com` בכל 118 המופעים: canonical (23), `og:url` (23), `og:image`/`twitter:image` (23), `sitemap.xml` (22 כתובות), `robots.txt` (שורת Sitemap), וכל כתובות ה-JSON-LD.
- קישורים פנימיים יחסיים לא נגעו בהם.

**נכסים**
- `pins/pin1.png`, `pin2.png`, `pin3.png` — נבנו מחדש ב-1000×1500 עם `PlungeWise` ו-`plungewise.com`, באותה שפה חזותית (צבעים, טיפוגרפיה, פריסה). תוקן גם חיתוך שורת הדומיין בתחתית pin2.
- `og-image.jpg` (1200×630) — **חדש**, תמונת שיתוף ממותגת. מוצבת ב-17 העמודים הכלליים; 6 עמודי המאמרים שומרים על תמונות המאמר שלהם.
- `logo.svg` (וורדמארק אופקי) ו-`logo-square.png` (600×600 לפרופילים חברתיים) — **חדשים**.
- הפאביקון לא שונה: הוא סימן גרפי ללא אותיות (data-URI), ולכן שרד את המיתוג כמו שהוא.
- `hero.jpg` ותמונות הכרטיסים לא שונו — אין בהן טקסט מותג.

**מה נשאר בכוונה עם המותג הישן**
- `plungepicks-20` (22 מופעים) — מזהה שותף אמזון פעיל. אין לגעת.
- `plungepicks@gmail.com` (6 מופעים) — עד שתופעל כתובת חדשה.
- `pinterest.com/plungepicks` (25 מופעים) — לפי החלטת בועז.
- `github.com/boazcugz/plunge-picks` ושם הפרויקט ב-Netlify — לא שונו.
- שמות קבצי HTML, ה-slugs, שמות המוצרים וכתובות תוכניות השותפים — לא שונו.
- הביטוי הגנרי `best budget cold plunge picks` ב-`diy-ice-bath-ideas.html` — טקסט רגיל, לא שם מותג.

**מסמכים**
- מסמכי ההפעלה (`CURRENT_STATUS`, `BACKLOG`, `MASTER_BRIEF_V2`, `WORK_PROTOCOL`, `PROJECT_MASTER`, `QA_CHECKLIST`, `PRODUCT_SOURCES`, `COMPETITORS`) עודכנו ל-PlungeWise.
- `MASTER_BRIEF_V2.md` קיבל הערת מיתוג בראשו: התוכן לא שונה, רק שם המותג והדומיין; md5 של ההעתק ה-verbatim המקורי נשמר בהערה.
- 8 דוחות היסטוריים בשורש קיבלו הערת "מסמך היסטורי" המבהירה מתי ולמה השם הוחלף.
- ציטוט היסטורי ב-CHANGELOG הוחזר לנוסח שנכתב באותו יום.

**בדיקות**
- Playwright, 23/23 עמודים, 320px ו-1280px: 0 שגיאות Console, 0 גלישה אופקית, 0 קישורים או עוגנים שבורים, `aria-expanded` `false→true→false` עם Escape, פוקוס מקלדת נראה.
- אחידות הדר/פוטר: ערך יחיד ב-23/23 עמודים לכל אחד מ-לוגו, סלוגן, קופירייט.
- קישורי אמזון: 13 קישורים, כולם עם `tag=plungepicks-20` ו-`rel="sponsored nofollow noopener" target="_blank"`.
- סריקת שאריות: 0 מופעים של `Plunge Picks` / `PLUNGE PICKS` / `PlungePicks` / `plunge-picks` / `plunge-picks.netlify.app`. 53 המופעים שנותרו של `plungepicks` הם בדיוק 22 תג + 6 מייל + 25 פינטרסט.

**דורש: יצירת branch `rebrand/plungewise`, commit והעלאה ל-GitHub על ידי בועז** (אין git בסביבת העבודה, ולכן אין commit hash מצדי). גיבוי מלא לפני השינוי: `plunge-picks-BACKUP-pre-rebrand.zip`.

---

## [2026-07-26] — Phase 0 + Phase 1: Production Trust Fix (לפי MASTER_BRIEF_V2)

**Phase 0 — מסמכי הפרויקט**
- נוסף `docs/MASTER_BRIEF_V2.md` — העתק מדויק (verbatim) של מסמך ההפעלה המחייב. md5 `0a3ac100f8a2ff428fb19822b23d74dc`.
- נכתבו מחדש `docs/CURRENT_STATUS.md` ו-`docs/BACKLOG.md` כך שישקפו את המצב האמיתי ואת סדר העדיפויות של הבריף החדש.

**Phase 1.1 — הפרדת קליקים ואירועי Analytics (§10.2, §16)**
- `analytics.js` נכתב מחדש: מראה `MERCHANTS` בקוד, `programStatusFor()`, והפרדה תלת-כיוונית בין `amazon_affiliate_click` (אמזון עם תג פעיל), `affiliate_click` (תוכנית מאושרת עם מעקב) ו-`merchant_click` (קישור מותג רגיל, ללא תוכנית). קליק מוכר כבר לא נספר כהמרה שותפים.
- נוסף hook הצהרתי `data-plunge-event` כדי שעמודים לא יצטרכו קוד מעקב משלהם.
- תפריט המובייל אוחד למקור אמת יחיד ב-`analytics.js` (כולל `aria-expanded` ו-Escape) — ההאזנה הכפולה שהשביתה את התפריט בעמוד הבית הוסרה.
- אין Measurement ID מומצא. `plungeTrack` עושה no-op בטוח עד שבועז יחבר GA4. אין שליחה של אימייל, שם, טלפון או כל PII.

**Phase 1.2 — קישורים (§10.3)**
- כל קישורי אמזון נושאים `tag=plungepicks-20` + `rel="sponsored nofollow noopener"` + `target="_blank"` + `data-merchant` / `data-product` / `data-pos`. נבדק: 0 חריגות.
- הוסרו מחירי אמזון סטטיים ליד קישורים.

**Phase 1.3 — סילוק טענות לא מבוססות (§9.4)**
- `index.html`: "Best Value Chiller" → "Mid-Range Chiller"; "Durable military-grade vinyl" → ניסוח מיוחס ליצרן; "runs on the loud side" → "not independently confirmed by Plunge Picks" (הנוסח כפי שנכתב באותו יום; שם המותג הוחלף מאוחר יותר ל-PlungeWise); הוסרו `$7,990` / `$1,149` מכרטיס ההשוואה. אפס מילות-מפתח §9.4 נותרו.
- `plunge-vs-ice-barrel.html`: כל מספר בטבלה מיוחס ליצרן עם תאריך בדיקה (יולי 2026) והערת שונות; "genuinely movable" הוסר; ה-callout של "דרך אמצע" כבר לא מבטיח חיסכון.
- `best-cold-plunge-tubs.html`, `best-budget-cold-plunge.html`, `diy-ice-bath-ideas.html`, `products.js`: אותה סריקה.
- `about.html`, `ice-vs-chiller.html`: טווחי מחיר לא-מסומנים סומנו `Typical estimated range` + תאריך + מתודולוגיה, או הוחלפו בשמות שכבה ללא מספר.

**Phase 1.4 — תוכן בריאות (§10.4)**
- `cold-plunge-beginners-guide.html` ו-`faq.html` נכתבו מחדש סביב הפרדה עקבית בין **Common practice** לבין **What the evidence says**.
- נוסף callout מפורש: אין פרוטוקול אוניברסלי מוסכם, ואף גוף רפואי לא קבע מינון סטנדרטי.
- "research sweet spot" נמחק. "protocol" → "conservative starting example". יעד 11 הדקות כבר לא מוצג כמטרה — הוא מוסבר ונדחה במפורש כסיכום תקשורתי ולא כהמלצה קלינית.
- נוספו 5 מקורות מאומתים בשני העמודים (Tipton 2017, Espeland 2022, Roberts 2015, Søberg 2021, RNLI) + "Sources last checked July 2026".
- נאמר במפורש שאף רופא לא סקר את התוכן ושאיננו מייחסים Medical Reviewer.

**Phase 1.5 — Schema (§11)**
- ה-FAQPage JSON-LD ב-`faq.html` נוצר מחדש **מתוך ה-DOM הגלוי** במקום עריכה ידנית. זה סגר 8 אי-התאמות בשמות שאלות, קטע תשובה משובש שהופיע רק ב-JSON-LD, וסדר שונה. כעת 19 שאלות גלויות = 19 רשומות JSON-LD, זהות בטקסט ובסדר (מאומת אוטומטית).
- באתר כולו: אין `Review`, אין `AggregateRating`, אין `ratingValue`, אין `Offer`, אין `Product`. נותרו רק `Organization`, `WebSite`, `Article`, `BreadcrumbList`, `FAQPage`.

**Phase 1.6 — נגישות (§14)**
- נוסף בלוק §14 ל-`style.css`: `:focus-visible`, `prefers-reduced-motion`, `.table-scroll`, `.sr-only`.
- כל טבלת `cmp-table` קיבלה `<caption>` שמסביר מקור ומגבלה; אין יותר `<th>` ללא `scope`.
- `aria-live="polite"` על אזורי תוצאות ב-`compare`, `cost-calculator`, `find-my-plunge`, `ice-vs-chiller`.

**תיקון נוסף**
- `compare.html`: כפתור "Copy shareable link" עטוף כעת ב-fallback. קודם הוא זרק שגיאת Console לא-מטופלת כשההרשאה ל-Clipboard נדחית.

**בדיקות (Playwright headless, 23 עמודים)**
- 0 שגיאות Console ב-320px וב-1280px, כולל הפעלת כל הכלים האינטראקטיביים.
- 0 גלישה אופקית ב-320px.
- 0 קישורים פנימיים שבורים, כולל כל עוגני `#sources` החדשים.
- תפריט מובייל: `aria-expanded` עובר false→true→false עם Escape ב-23/23.
- פוקוס מקלדת נראה ב-23/23.
- הפרדת הקליקים אומתה בזמן ריצה: אמזון→`amazon_affiliate_click`/approved, Plunge→`merchant_click`/not_approved.

**דורש: העלאה ל-GitHub על ידי בועז.**

## [2026-07-26] — ✅ העלאה בוצעה ואומתה: 10 קבצים, P0 נסגר
- 10 הקבצים עלו ל-GitHub ב-commit אחד ונפרסו ל-Netlify.
- אימות: כל 10 קיימים במאגר וזהים בייט-בבייט (md5) לקבצים המקומיים — אין העלאה חלקית או פגומה.
- אימות חי: `about`, `how-we-review`, `find-my-plunge`, `plunge-vs-ice-barrel`, `faq`, `diy-ice-bath-ideas` — כולם מחזירים תוכן אמיתי.
- `sitemap.xml` חי עם 22 כתובות. עמוד הבית מציג את מקטע Guides & Comparisons ואת קישורי הפוטר החדשים.
- **P0 (3 עמודי 404) נסגר.** האתר: 23 עמודים חיים.

## [2026-07-26] — חיבור 3 העמודים החדשים לאתר (תיקון עמודים יתומים)
- זוהה ליקוי: `plunge-vs-ice-barrel.html`, `faq.html`, `diy-ice-bath-ideas.html` נבנו ללא אף קישור פנימי נכנס — כלומר עמודים יתומים שגוגל וגולשים לא היו מוצאים.
- `index.html`: נוסף מקטע "Guides & Comparisons" (3 כרטיסים לשלושת העמודים) בין טבלת ההשוואה לאזור האמון; נוספו FAQ + DIY לעמודת Resources בפוטר.
- `best-cold-plunge-tubs.html`: נוסף מקטע "Keep reading" עם 4 קישורים.
- `best-budget-cold-plunge.html`: נוסף מקטע "Keep reading" עם 3 קישורים.
- ללא שינוי ב-`style.css` (עיצוב הכרטיסים inline, responsive) — כדי לא להגדיל את ה-commit.
- נבדק: 0 שגיאות Console בשלושת העמודים, איזון תגיות תקין, כל הקישורים הפנימיים קיימים.

## [2026-07-24] — עמוד DIY חדש: 9 רעיונות תקציב לאמבט קרח
- נבנה `diy-ice-bath-ideas.html` — פוסט פינטרסט-נייטיב (מבוסס פער מול Casolia/DexDecor): 9 רעיונות (סטוק-טנק, אינפלטבילי, טוטה, אמבטיה, IBC, מקפיא-חזה, שדרוג צ'ילר, בידוד, בריכת ילדים).
- כנות: עלויות כטווחים גסים, אזהרת בטיחות בולטת (חשמל+מים, GFCI), הפניה ל-medical-disclaimer. קישורי אמזון עם התג + rel נכון.
- קבצים: `diy-ice-bath-ideas.html` (חדש), `sitemap.xml`. נבדק: 0 שגיאות, JSON-LD תקין, קישורים תקינים.

## [2026-07-24] — עמוד FAQ חדש (19 שאלות + FAQPage schema)
- נבנה `faq.html` — 19 שאלות נפוצות עם תשובות כנות (כמה קר/כמה זמן/כמה תדיר, צ'ילר מול קרח, עלות, בטיחות, דירה, לפני/אחרי אימון וכו').
- FAQPage JSON-LD אמיתי (תופס rich results בגוגל). קישורים לכלים ולמדריך ול-medical-disclaimer.
- מבוסס פער שזוהה אצל המתחרים (Global Viewpoint וכו' — לכולם FAQ גדול, לנו לא היה).
- קבצים: `faq.html` (חדש), `sitemap.xml`. נבדק: 0 שגיאות, JSON-LD תקין (19 Qs), קישורים תקינים.

## [2026-07-24] — עמוד השוואה חדש: Plunge All-In vs Ice Barrel 300
- נבנה `plunge-vs-ice-barrel.html` — עמוד מודל-מול-מודל ראשון, מבוסס ניתוח מתחרים (Nordic Recovery Guide).
- מפרטים אומתו ממקורות יצרן רשמיים (plunge.com, icebarrel.com), 24 ביולי 2026. שדות לא-מפורסמים סומנו "Not confirmed".
- כנות נשמרה: אין כוכבים, אין "בדקנו בעצמנו", הפרדה בין טענת יצרן למסקנה, קישור ל-how-we-review.
- קבצים: `plunge-vs-ice-barrel.html` (חדש), `sitemap.xml` (נוספה שורה).
- נבדק: 0 שגיאות Console, כל הקישורים הפנימיים תקינים, מותאם מובייל.
- דורש: העלאה ל-GitHub.

## [2026-07-24] — הקמת תיקיית /docs ופרוטוקול העבודה
- נוצרו 7 מסמכי ניהול: PROJECT_MASTER, CURRENT_STATUS, WORK_PROTOCOL, CHANGELOG, QA_CHECKLIST, PRODUCT_SOURCES, BACKLOG.
- קבצים: `docs/*.md` (חדשים).
- דורש: העלאת תיקיית `docs/` ל-GitHub.

## [2026-07-23] — מסמך סיכום לבקרת איכות
- נוצר `סיכום-פרויקט-לבקרת-איכות.md` להעברה ל-GPT (לא חלק מהאתר).

## [2026-07] — עיצוב מחדש של עמוד הבית לפי מוקאפ + החלת header/footer סיטווייד
- עמוד בית שוכתב: nav2, hero2, מיני-Finder, Top-3 picks (קטגוריות מחיר, בלי כוכבים), טבלת השוואה, אזור אמון (4), lead-gen (handler כן — לא מזייף הצלחה), footer2.
- Header/Footer אחידים הוחלו על כל 20 העמודים.
- נוסף מעבר תפריט המבורגר למובייל ב-`analytics.js`.
- קבצים: `index.html`, `style.css` (בלוק "Homepage v2"), `analytics.js`, וכל עמודי ה-HTML (header/footer).
- תיקוני באגים: כפתור hero ששוכתב בטעות ע"י regex → תוקן; מחיר אמזון תועה `≈ $100+` → הוסר.

## [2026-07] — אצווה 3: פלטפורמת החלטה (Master Brief)
- נוספו/עודכנו 4 כלים אינטראקטיביים: Product Finder, Cost Calculator, Comparison Builder, Ice-vs-Chiller.
- קבצים: `find-my-plunge.html`, `cost-calculator.html`, `compare.html`, `ice-vs-chiller.html`, `products.js`, `style.css` (בלוק "Interactive tools").

## [2026-07] — אצווה 2: כלי החלטה ומסד נתונים
- מרכוז נתונים: `products.js` (7 מוצרים), `affiliate-programs.js`, `analytics.js`.

## [2026-07] — אצווה 1: בקרת תאימות ואמון
- נוספו עמודי אמון/חוק: about, how-we-review, editorial-policy, corrections, contact, privacy, terms, affiliate-disclosure, product-testing, medical-disclaimer.
- ריכוך טענות לא-מבוססות; הוספת גילויי שותפים ומשפט אמזון מדויק.

## [2026-07] — השקה ראשונית
- בניית האתר, פריסה ל-Netlify מ-GitHub, אימות פינטרסט, פרסום 2 פינים.
- הקמת משימה מתוזמנת שבועית (יום ראשון 17:00 שעון ישראל).
