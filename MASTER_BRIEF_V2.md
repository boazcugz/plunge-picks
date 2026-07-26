# PLUNGEWISE — MASTER BRIEF v2.0

**תאריך:** 26 ביולי 2026  
**בעל הפרויקט:** בועז  
**מפתח ראשי:** Claude  
**בקרת איכות, UX/UI ואסטרטגיה:** GPT  
**אתר חי:** https://plungewise.com/  
**Repository:** https://github.com/boazcugz/plunge-picks  

> **הערת מיתוג (26/7/2026, משימה PP-REBRAND-001):** המסמך הזה נוצר כשהמותג נקרא **Plunge Picks**.
> במסגרת המיתוג מחדש הוחלף שם המותג בגוף המסמך ל-**PlungeWise** וכתובת האתר ל-`https://plungewise.com`,
> כדי שהמסמך התפעולי ישקף את המצב הנוכחי. **תוכן ההנחיות עצמן לא שונה** — רק שם המותג והדומיין.
> md5 של ההעתק ה-verbatim המקורי: `0a3ac100f8a2ff428fb19822b23d74dc`.
> שם ה-repository ב-GitHub ושם הפרויקט ב-Netlify **לא** שונו ונשארו `plunge-picks`.

---

## 0. הוראת הפעלה לקלוד

אתה מפתח הקוד הראשי של PlungeWise.

לפני כל שינוי:

1. קרא את הקוד הקיים ואת מסמכי `/docs`.
2. בדוק את האתר החי ולא רק את הקבצים המקומיים.
3. אל תשנה ארכיטקטורה, שפה עיצובית או מבנה נתונים ללא צורך.
4. אל תמציא מפרטים, מחירים, תוצאות בדיקה, ביקורות, דירוגים או תוכניות שותפים.
5. בצע את העבודה לפי השלבים והעדיפויות במסמך.
6. אל תנסה להשלים את כל התוכנית בקומיט אחד.
7. לאחר כל שלב החזר דוח מסירה מלא והמתן לבקרת איכות.

GitHub הוא מקור האמת לקוד. תיקיית `/docs` היא מקור האמת להחלטות, לסטטוס ולמקורות.

---

## 1. מטרת הפרויקט

PlungeWise הוא אתר החלטה והשוואה בתחום:

- Cold plunge tubs
- Ice baths
- Water chillers
- DIY cold plunge systems
- Filtration and sanitation
- Cold-plunge accessories
- Home recovery equipment

האתר אינו אמור להיות בלוג כללי שמייצר מאמרים לפי מילות מפתח. הוא צריך לעזור למשתמש להחליט:

1. האם להתחיל עם קרח או עם Chiller.
2. האם לבנות מערכת DIY או לקנות מערכת מוכנה.
3. איזה מוצר מתאים לתקציב, למקום ולשגרת השימוש.
4. מה תהיה עלות הבעלות האמיתית.
5. אילו מגבלות, סיכונים ועלויות נסתרות קיימים לפני הקנייה.

### מיצוב מרכזי

> Find the right way to cold plunge — buy a complete system, build your own, or start with a simple ice-based setup.

### המודל העסקי

המודל משלב:

- עמלות High-Ticket ממערכות מוכנות וצ'ילרים.
- עמלות ממוצרי DIY ואביזרים.
- רשימת תפוצה עתידית.
- תוכן וכלים שמייצרים תנועה אורגנית ותנועה מ-Pinterest.
- בהמשך, תוכן מקורי המבוסס על בדיקות, מדידות, תמונות וסרטונים.

היעד של הכנסה חודשית בסך $2,000 הוא יעד עסקי עתידי אפשרי, לא הבטחה ולא תחזית מוכחת. אין להשתמש בהנחות על עמלה, Conversion Rate או נפח תנועה עד שקיימים נתוני אמת.

---

## 2. חלוקת תפקידים

### בועז — בעל המוצר

- קובע מטרות עסקיות וסדרי עדיפויות.
- מאשר עיצוב, תוכן ומסחור.
- מספק חשבונות, מזהים וקישורי שותפים.
- מחליט מתי גרסה מוכנה ל-Production.
- מאשר שימוש בשם, פרופיל מחבר או מידע אישי.

### GPT — בקרת איכות, עיצוב ואסטרטגיה

- בודק את האתר החי.
- מגדיר משימות ו-Acceptance Criteria.
- מבקר UX/UI, מובייל, SEO, נגישות ואמינות.
- בודק התאמה ל-Amazon, FTC וכללי הגילוי.
- מאשר או דוחה את תוצאת העבודה של קלוד.
- אינו מפתח ה-Production הראשי.

### Claude — מפתח הקוד הראשי

- מיישם HTML, CSS ו-JavaScript.
- שומר על הארכיטקטורה הקיימת.
- בודק קישורים, Console, מובייל וזרימות משתמש.
- מעדכן את מסמכי הסטטוס.
- מדווח בדיוק מה בוצע, מה לא בוצע ומה עדיין דורש בדיקה.

אין לאפשר ל-GPT ולקלוד לערוך את אותם קבצים במקביל.

---

## 3. ארכיטקטורה קיימת שאסור לשנות ללא אישור

- אתר סטטי.
- HTML, CSS ו-Vanilla JavaScript.
- ללא Framework.
- ללא Build System.
- ללא Backend פעיל.
- פריסה אוטומטית מ-GitHub ל-Netlify.
- `style.css` משותף.
- `products.js` כמסד מוצרים.
- `affiliate-programs.js` למעקב אחר תוכניות.
- `analytics.js` כתשתית למדידה.

אין להעביר את האתר ל-React, Next.js, WordPress או מערכת אחרת במסגרת הבריף הנוכחי.

---

## 4. מצב האתר המאומת נכון ל-26 ביולי 2026

### מה כבר עובד

- עמוד הבית פעיל.
- `about.html` פעיל.
- `find-my-plunge.html` פעיל.
- `how-we-review.html` פעיל.
- Comparison Builder פעיל.
- Cost Calculator פעיל.
- Ice vs. Chiller Tool פעיל.
- Buyer Checklist פעיל.
- FAQ קיים.
- עמוד DIY עם תשעה רעיונות קיים.
- עמוד Plunge vs. Ice Barrel קיים.
- עמודי המדיניות, הגילוי, הבדיקות והבטיחות קיימים.
- ה-sitemap כולל את עמודי About, Finder, How We Review, FAQ, DIY וההשוואה החדשה.
- האתר מצהיר שהוא Research-Based ושאינו מבצע כרגע בדיקות פיזיות.
- התמונות האווירתיות מסומנות כ-Illustrative.
- המשפט הנדרש של Amazon נמצא בפוטר.

### מה עדיין אינו מוכן

- טופס המייל בעמוד הבית נראה פעיל, אך ספק מייל עדיין אינו מחובר.
- הטופס מודד `lead_signup` גם כשלא בוצעה הרשמה אמיתית.
- GA4 אינו פעיל כל עוד לא הוזן Measurement ID ולא נוסף קוד ההפעלה.
- חלק מהקישורים למותגים שאינם תוכניות מאושרות מסומנים ומדודים כקישורי שותפים.
- קישורי Amazon מסוימים הם קישורי חיפוש כלליים ולא Special Links למוצר מסוים.
- קיימות טענות מוצריות שאינן תואמות את `verify:true`.
- קיימים ניסוחי מחיר ומחירים משוערים שאינם כוללים מקור ותאריך בדיקה.
- מדריך המתחילים וה-FAQ כוללים המלצות בריאותיות ופרוטוקולים ללא אזור מקורות מספק.
- אין `:focus-visible` משותף.
- אין `prefers-reduced-motion`.
- בחלק מהטבלאות חסרים `caption` ו-`scope`.
- DIY מופיע בעמוד הבית ובפוטר, אך אינו קטגוריה ראשית בניווט ואין לו Hub מרכזי.

---

## 5. מסקנות מחקר Gemini — מה מאמצים

### 5.1 תוכן גנרי אינו מספיק

האתר צריך לייצר תוכן שאינו Commodity Content:

- כלים אינטראקטיביים.
- השוואות לפי קריטריונים אמיתיים.
- חישובי עלות בעלות.
- מקורות ותאריכי אימות.
- תמונות, מדידות וסרטונים מקוריים בעתיד.
- מסקנות שמסבירות Trade-offs ולא רק חוזרות על חומרי יצרן.

### 5.2 SEO עדיין חשוב

אין לבנות “מערכת GEO” נפרדת מה-SEO.

יש להתמקד ב:

- תוכן ייחודי ומועיל.
- מבנה טכני ברור.
- אינדוקס תקין.
- Semantic HTML.
- חוויית משתמש טובה.
- מידע שניתן לאימות.
- Search Console.
- תמונות וסרטונים רלוונטיים.

### 5.3 אין לבצע GEO Hacks

אין להוסיף או לבצע רק לצורך AI:

- `llms.txt` כפתרון קסם.
- עשרות עמודים כמעט זהים.
- “Chunking” מלאכותי של תוכן.
- אזכורים מזויפים ב-Reddit או בפורומים.
- Schema שאינו נתמך בתוכן אמיתי.
- טקסט שנכתב למנוע בלבד ולא לקורא.

### 5.4 ניסיון אמיתי הוא יעד אסטרטגי

תוכן Hands-On הוא יתרון משמעותי, אך אסור להמציא אותו.

בשלב הנוכחי האתר ימשיך להשתמש ב-Research-Based Comparisons. בהמשך יש לבצע בדיקות אמיתיות של לפחות:

1. מוצר Budget אחד.
2. מערכת DIY אחת.
3. Chiller או מערכת מוכנה אחת, כאשר התקציב והתנועה מצדיקים זאת.

### 5.5 לא מאמצים מספרים שלא אומתו

אין להכניס לתוכנית העסקית כעובדות:

- שיעור הופעה קבוע של AI Overviews.
- שיעור ירידת CTR קבוע לכל שאילתה.
- שיעור המרה כללי של High-Ticket.
- עמלה של מותג ללא תנאים רשמיים.
- טענה ששתי מכירות יספיקו ליעד ללא אישור לתוכנית.
- נתוני התאוששות HCU ללא מקור ראשוני.

כל נתון עסקי נשמר כ-Hypothesis עד שנמדד בפועל.

---

## 6. אסטרטגיית התוכן הסופית

חלוקת מאמץ מומלצת:

- **60% — מוצרים מוכנים, השוואות וכלי החלטה מסחריים.**
- **30% — DIY, Budget, תחזוקה ועלות בעלות.**
- **10% — תוכן כללי ובריאותי, עם מקורות ובזהירות.**

### ארבעת עמודי התווך

1. **Best Cold Plunges**
2. **Compare Products**
3. **DIY & Budget**
4. **Tools & Ownership Costs**

תוכן בריאותי אינו עמוד התווך המרכזי של האתר.

---

## 7. DIY & Budget כקטגוריה ראשית

### 7.1 מטרת הקטגוריה

DIY אינו רק תוכן זול. הוא צריך:

- להביא קהל עם כוונת חיפוש רחבה.
- לייצר ערך מקורי.
- להציע מוצרים ואביזרים שניתן לקשר אליהם.
- להוביל משתמשים תכופים לעבור מ-Ice ל-Chiller.
- להמחיש מתי מערכת מוכנה עדיפה על DIY.
- לתמוך במודל High-Ticket במקום להחליף אותו.

### 7.2 שינוי בניווט

הניווט הראשי המומלץ:

```text
Best Cold Plunges
Comparisons
DIY & Budget
Guides
Calculator
Find My Cold Plunge
```

- `Find My Cold Plunge` נשאר CTA מודגש.
- `About Us` עובר לפוטר ולדפי האמון.
- אין לבנות Dropdown מסובך בשלב הראשון.
- יש לעדכן את הניווט בכל עמודי האתר ולא רק בעמוד הבית.

### 7.3 עמוד Hub חדש

יש ליצור:

```text
diy-cold-plunge.html
```

Title מוצע:

```text
DIY Cold Plunge & Budget Ice Bath Guide | PlungeWise
```

H1 מוצע:

```text
DIY Cold Plunge & Budget Ice Bath Solutions
```

העמוד אינו עוד רשימת רעיונות. הוא עמוד החלטה שמציג שלושה מסלולים:

#### מסלול A — Ice-Based Starter

- Inflatable tub.
- Stock tank.
- Bathtub.
- Tote או פתרון זמני.
- יתרונות, חסרונות ועלות תפעול.
- קישור למחשבון העלויות.

#### מסלול B — DIY With Chiller

- Tub מתאים.
- Chiller.
- Pump.
- Filtration.
- Hoses and fittings.
- Drainage.
- Electrical safety boundaries.
- קישור ל-Ice vs. Chiller Tool.

#### מסלול C — Ready-Made System

- למשתמש שרוצה פחות תחזוקה.
- אחריות ותמיכה.
- מערכת משולבת.
- קישור ל-Best Cold Plunges ול-Finder.

### 7.4 תיבת החלטה בראש ה-Hub

יש להוסיף רכיב:

```text
Build It or Buy It?

Choose your path:
1. Start cheap with ice.
2. Build a filtered chiller setup.
3. Buy a complete system.
```

לכל מסלול יוצגו:

- Up-front cost category.
- Ongoing effort.
- Temperature control.
- Maintenance.
- Portability.
- Upgrade path.
- Main risk or limitation.

אין להציג מספרים לא מאומתים כעובדות.

### 7.5 מעמד העמוד הקיים

`diy-ice-bath-ideas.html` נשאר קיים והופך לעמוד משנה של ה-Hub.

יש לשנות Breadcrumb:

```text
Home > DIY & Budget > DIY Ice Bath Ideas
```

יש להוסיף קישורים דו-כיווניים בין:

- ה-Hub.
- DIY Ideas.
- Cost Calculator.
- Ice vs. Chiller.
- Best Budget Cold Plunge.
- Best Cold Plunges.
- Product Finder.

### 7.6 תכני המשך ראשונים

לא להעלות עשרים מאמרים. להתחיל בשלושה עמודים חזקים:

#### A. Stock Tank Cold Plunge Setup

```text
stock-tank-cold-plunge.html
```

כולל:

- בחירת גודל.
- משטח.
- ניקוז.
- בידוד.
- מכסה.
- ניקיון.
- מעבר עתידי ל-Chiller.
- רשימת רכיבים.
- מגבלות.

#### B. DIY Cold Plunge Filtration

```text
diy-cold-plunge-filtration.html
```

כולל:

- תפקיד המשאבה.
- תפקיד הפילטר.
- Flow rate כקריטריון שיש לאמת.
- מתי מחליפים מים.
- כיסוי וניקיון.
- אין המלצות כימיות מסוכנות ללא מקור מוסמך.

#### C. DIY vs. Ready-Made

```text
diy-vs-ready-made-cold-plunge.html
```

כולל השוואה לפי:

- עלות התחלתית.
- זמן עבודה.
- תחזוקה.
- קירור.
- סינון.
- מראה.
- אחריות.
- תמיכה.
- סיכון לתקלות.
- עלות בעלות.

זהו העמוד המסחרי החשוב ביותר באשכול DIY.

### 7.7 שלב שני בלבד

לאחר שלושת העמודים הראשונים ניתן לשקול:

- Standalone Chiller Buying Guide.
- Cold Plunge Pump Guide.
- Covers and Insulation Guide.
- DIY Maintenance Schedule.
- Apartment DIY Guide.
- Outdoor Cold Plunge Guide.

כל עמוד חדש חייב לענות על שאלה ייחודית ולא לחזור על תוכן קיים.

---

## 8. כללי בטיחות ל-DIY

### חובה

- להציג אזהרת חשמל ומים באופן בולט.
- להמליץ על שימוש בשקע מוגן לפי הדרישות המקומיות ועל בעל מקצוע מוסמך כאשר נדרשת עבודת חשמל.
- להבהיר שיש לפעול לפי הוראות היצרן של כל רכיב.
- להבהיר שמערכות DIY אינן נבדקות או מאושרות על ידי PlungeWise.
- להציג אזהרת עומס משקל, ניקוז, החלקה וילדים.
- להציג קישור ל-Medical Disclaimer.

### אסור

- אין לפרסם מדריך חיווט.
- אין להסביר כיצד לעקוף מנגנון בטיחות.
- אין להמליץ להיכנס למקפיא מחובר לחשמל.
- אין להציג Chest Freezer Conversion כפתרון מומלץ.
- אין להבטיח שמערכת מאולתרת בטוחה.
- אין לתת מינוני חיטוי ללא מקורות מתאימים.
- אין להציג GFCI כתחליף לבדיקת בעל מקצוע.

העמוד הקיים יכול להזכיר Chest Freezer Conversion לצורך אזהרה והשוואה בלבד, לא כ-Tutorial.

---

## 9. Evidence-First Content

### 9.1 סוגי ראיות

כל טענה מוצרית צריכה להשתייך לאחד הסוגים:

```text
manufacturer
manual
retailer
independent-test
owner-feedback
plungewise-test
editorial-inference
unverified
```

### 9.2 מבנה נתונים עתידי

יש להכין מיגרציה הדרגתית למבנה:

```js
{
  value: "",
  sourceUrl: "",
  sourceName: "",
  sourceType: "",
  verifiedDate: "",
  evidenceLevel: "verified | manufacturer-claimed | independently-reported | unverified",
  testedByUs: false,
  notes: ""
}
```

אין לבצע שבירה של `products.js` במשימה אחת. יש לשמור Backward Compatibility ולבצע בהדרגה.

### 9.3 שתי תוויות תוכן בלבד

#### Research-Based Comparison

מותר כאשר לא בוצעה בדיקה פיזית.

ניסוחים מותרים:

- `The manufacturer lists...`
- `Published specifications indicate...`
- `Our research suggests...`
- `Not independently confirmed by PlungeWise.`
- `Last verified...`

#### Hands-On Review

מותר רק כאשר קיימים:

- מוצר אמיתי.
- תקופת בדיקה.
- שיטה.
- תמונות מקוריות.
- מדידות.
- מגבלות.
- שם הבודק.
- תאריך.

### 9.4 טענות שדורשות ראיות

אין לפרסם כעובדה ללא מקור:

- Quiet או noisy.
- Reliable.
- Durable.
- Fast cooling.
- Good cold retention.
- Apartment-friendly.
- Fits tall users.
- Full-shoulder immersion.
- Best value.
- Strong warranty.
- Easy maintenance.
- Lasts for years.

כאשר אין מקור, יש להסיר את הטענה או להפוך אותה ל-Editorial Inference מסויגת.

---

## 10. תיקוני אמינות שחייבים להתבצע לפני הרחבת DIY

### 10.1 טופס המייל

כל עוד אין MailerLite, ConvertKit או ספק אחר פעיל:

- להסיר את שדה המייל מעמוד הבית.
- להחליף את הכפתור ל-`Open the Free Buyer Checklist`.
- להפנות ל-`buyer-checklist.html`.
- למדוד `checklist_open`.
- לא למדוד `lead_signup`.
- לא לקלוט או לשמור כתובת מייל אפילו זמנית.

כאשר ספק המייל יחובר:

- להשתמש ב-Double Opt-In.
- להציג הסכמה ברורה.
- למדוד `email_signup_success` רק לאחר הצלחה אמיתית.
- לעדכן Privacy Policy.

### 10.2 קישורים מסחריים

יש להפריד:

```text
merchant_click
affiliate_click
amazon_affiliate_click
```

כללים:

- קישור Amazon עם Tag פעיל: `amazon_affiliate_click`.
- קישור ישיר עם תוכנית מאושרת ו-Tracking: `affiliate_click`.
- קישור רגיל למותג ללא תוכנית מאושרת: `merchant_click`.
- אין לספור Merchant Click כהמרת Affiliate.
- אין להציג שיעורי עמלה או Cookie Window ללא אימות רשמי.

### 10.3 Amazon

- להחליף קישורי חיפוש כלליים ב-Special Links למוצר מסוים.
- אין להציג מחיר Amazon עדכני ללא כלי מאושר.
- מותר להשתמש ב-Budget / Mid-range / Premium.
- אם מוצג טווח כללי שאינו מחיר Amazon, יש לסמן:
  - `Typical estimated range`
  - תאריך בדיקה.
  - מקור או מתודולוגיה.
  - הבהרה שהמחיר משתנה.
- אין להשתמש ב-`under $200` ליד קישור Amazon ללא נתון מאושר ועדכני.

### 10.4 תוכן בריאותי

יש לעדכן את:

- `cold-plunge-beginners-guide.html`
- `faq.html`

דרישות:

- להוסיף Sources section.
- להימנע מהמונח `research sweet spot` ללא תמיכה.
- להחליף “protocol” ב-`conservative starting example`.
- להבהיר שאין פרוטוקול אוניברסלי מוסכם.
- להפריד בין Common Practice לבין Evidence.
- להסיר או לסייג את יעד 11 הדקות.
- לא להציג 15°C, 10–12°C, 2–4 פעמים בשבוע או זמן שהייה כהוראה רפואית.
- לשמור אזהרות ברורות.
- אין להוסיף Medical Reviewer שלא בדק בפועל את הטקסט.

---

## 11. Structured Data ו-AI Search

### להשאיר

- `Organization`
- `WebSite`
- `Article`
- `BreadcrumbList`

בתנאי שהנתונים תואמים לתוכן הגלוי.

### לא להוסיף כרגע

- `Review`
- `AggregateRating`
- דירוגי כוכבים.
- מספר ביקורות.
- `Offer` עם מחיר או מלאי לא מעודכן.
- `Product` מלא לעמוד שאינו מכיל נתונים אמינים ומספיקים.
- `Person` עם זהות או מומחיות שלא אושרו.

### FAQPage

ה-FAQ הגלוי יכול להישאר עם `FAQPage` אם ה-JSON-LD תואם במדויק לשאלות ולתשובות המוצגות.

עם זאת:

- אין לראות בו מנוע צמיחה.
- אין להשקיע זמן בהוספת FAQ Schema לכל עמוד.
- אין לצפות ל-Rich Result רגיל לאתר מסחרי מסוג זה.
- אם התוכן הרפואי משתנה, חייבים לעדכן גם את ה-JSON-LD.

### עקרונות AI Search

- Answer-first כאשר זה מועיל לקורא.
- Bottom Line קצר.
- מקורות גלויים.
- תאריכי אימות.
- מידע מקורי.
- מבנה ברור.
- תמונות וסרטונים מקוריים בהמשך.
- אין כתיבה מלאכותית רק עבור AI.

---

## 12. מבנה Bottom Line לעמודי החלטה

בראש כל עמוד השוואה, DIY או מדריך קנייה ניתן להשתמש ב:

```text
Bottom line:
Best suited for:
Main limitation:
Evidence basis:
Last verified:
```

דוגמה:

```text
Bottom line:
A stock tank is a low-cost, durable starting point for outdoor use, but it provides no active cooling or insulation.

Evidence basis:
General product category research; exact size, material, price and warranty depend on the selected model.

Last verified:
July 2026.
```

אין להשתמש בניסוח שנשמע כאילו נבדק מוצר מסוים אם לא נבחר מוצר מסוים.

---

## 13. UX ועיצוב

### עקרונות קיימים

- לשמור על פלטת הכחול כהה, צ'רקול וציאן.
- לשמור על Typography קיימת.
- לשמור על Cards, Rounded Corners ו-CTA Style.
- Header ו-Footer אחידים.
- Mobile-First.
- אין Redesign כולל.

### עיצוב קטגוריית DIY

הקטגוריה צריכה להיראות כחלק טבעי מהמותג, לא כאתר נפרד.

ה-Hub יכלול:

- Hero קצר.
- Build vs. Buy decision.
- שלושה Path Cards.
- טבלת השוואה.
- אזור Safety.
- מדריכים מובילים.
- CTA ל-Calculator.
- CTA ל-Finder.
- CTA למוצרים מוכנים.

### עמוד הבית

יש להוסיף אזור מרכזי לאחר ה-Finder או לאחר Top Picks:

```text
Build It or Buy It?

Explore ice-based DIY setups, filtered chiller builds, and complete systems — then compare the real cost and effort of each.

[Explore DIY & Budget]
[Compare DIY vs. Ready-Made]
```

העמוד הקיים “9 DIY Ice Bath Ideas” נשאר ככרטיס, אך ה-CTA הראשי של האזור מוביל ל-Hub החדש.

---

## 14. נגישות

יש להוסיף למערכת המשותפת:

- `:focus-visible`.
- Focus ברור לכפתורים, קישורים ושדות.
- `prefers-reduced-motion`.
- Labels גלויים לשדות.
- `aria-live="polite"` לתוצאות ולהודעות.
- `caption` לטבלאות כאשר נדרש.
- `scope="col"` בכותרות עמודות.
- ניווט מלא במקלדת.
- סגירת תפריט מובייל באמצעות Escape.
- עדכון `aria-expanded`.
- בדיקת 320px ללא גלישה אופקית.

אין להסתמך רק על `aria-label` כאשר ניתן להציג Label גלוי.

---

## 15. ביצועים

יש לבצע לאחר תיקוני האמינות:

- המרת JPG ל-WebP או AVIF עם Fallback לפי הצורך.
- `width` ו-`height` לתמונות.
- Lazy Loading לתמונות שאינן מעל הקפל.
- בדיקת משקל Hero.
- Minification רק אם אינה פוגעת ביכולת התחזוקה.
- Lighthouse Mobile לעמוד הבית, DIY Hub ועמוד השוואה.
- אין להוסיף ספריות גדולות לצורך רכיב קטן.

---

## 16. Analytics

### אירועים נדרשים

```text
product_finder_start
product_finder_complete
comparison_created
cost_calculator_complete
ice_vs_chiller_complete
checklist_open
email_signup_success
merchant_click
affiliate_click
amazon_affiliate_click
diy_path_selected
diy_to_ready_made_click
diy_component_click
```

### פרמטרים

```text
page_slug
product_slug
merchant
cta_position
link_type
diy_path
price_category
affiliate_status
```

אין לשלוח:

- כתובת מייל.
- שם.
- טלפון.
- טקסט חופשי אישי.
- PII אחר.

### הפעלת GA4

- לא להמציא Measurement ID.
- לתעד היכן להוסיף אותו.
- לאחר שבעל האתר מספק ID, להפעיל ולבדוק ב-DebugView.
- לעדכן `CURRENT_STATUS.md`.

---

## 17. Author, About ו-E-E-A-T

אין להמציא מומחה.

אפשר להציג:

- שם מפעיל האתר, רק לאחר אישור בועז.
- מטרת האתר.
- תהליך המחקר.
- הכישורים הרלוונטיים האמיתיים.
- מגבלות.
- גילוי שאין מעבדת בדיקות ואין צוות רפואי.

אין להציג:

- Physiotherapist.
- Doctor.
- Certified Cold Therapy Expert.
- Testing Lab.
- Editorial Team.

אלא אם הדבר נכון ומתועד.

`Person` Schema יתווסף רק לאחר אישור זהות ופרטי מחבר אמיתיים.

---

## 18. ביזור ערוצים

### עכשיו

- SEO.
- Pinterest.
- Email לאחר חיבור ספק.
- קישורים פנימיים וכלים.

### בהמשך

- YouTube לאחר שיש מוצר או מערכת אמיתית לצלם.
- סרטוני מדידה ותהליך.
- שיתופי פעולה אמיתיים.
- Earned Media אמיתי.

### אסור

- תגובות Reddit מזויפות.
- Quora Spam.
- רכישת אזכורים לא אותנטיים.
- יצירת פרופילים שנראים כמו משתמשים עצמאיים.
- Link Schemes.

---

## 19. שלבי היישום

### Phase 0 — תיעוד

לפני שינוי קוד:

- להוסיף את המסמך ל-`/docs/PROJECT_MASTER.md` או כ-`MASTER_BRIEF_V2.md`.
- לעדכן `CURRENT_STATUS.md`.
- לעדכן `BACKLOG.md`.
- לשמור Commit נפרד.

### Phase 1 — Production Trust Fix

לבצע לפני הרחבת DIY:

1. להסיר את טופס המייל הלא פעיל.
2. לתקן Event Tracking.
3. להפריד Merchant/Affiliate/Amazon clicks.
4. לנקות טענות מוצר לא מאומתות.
5. להסיר מחירי Amazon סטטיים.
6. להוסיף מקורות לתוכן הבריאותי.
7. להוסיף נגישות בסיסית.
8. לבדוק Console וקישורים.

### Phase 2 — DIY Category Foundation

1. ליצור `diy-cold-plunge.html`.
2. לעדכן ניווט בכל האתר.
3. להוסיף אזור Build It or Buy It לעמוד הבית.
4. לעדכן Breadcrumbs.
5. ליצור Internal Linking.
6. להוסיף Analytics לאזור DIY.
7. לעדכן sitemap.
8. לעדכן canonical ו-Open Graph.
9. להוסיף Article/Breadcrumb schema מתאים בלבד.

### Phase 3 — DIY Content Cluster

ליצור לפי הסדר:

1. `diy-vs-ready-made-cold-plunge.html`
2. `stock-tank-cold-plunge.html`
3. `diy-cold-plunge-filtration.html`

כל עמוד עולה בנפרד ועובר QA.

### Phase 4 — Original Evidence

- לבחור מערכת DIY אחת אמיתית.
- לצלם.
- למדוד עלות, נפח, זמן עבודה ותחזוקה.
- לפרסם Case Study.
- להוסיף תווית Hands-On רק לעמוד שבאמת נבדק.

### Phase 5 — Growth

רק לאחר:

- GA4 פעיל.
- Search Console פעיל.
- קישורי שותפים תקינים.
- לפחות נתוני קליקים אמיתיים.
- אין P0/P1 פתוחים.

ניתן להתחיל:

- תוכן נוסף.
- Email Course.
- YouTube.
- ניסוי קטן בתנועה בתשלום.

---

## 20. Acceptance Criteria ל-Phase 1

- אין טופס שמבקש מייל ללא ספק פעיל.
- אין `lead_signup` מזויף.
- Merchant links אינם נספרים כ-Affiliate.
- Amazon links מזוהים בנפרד.
- אין טענה המסומנת `verify:true` שמוצגת כעובדה ללא סייג.
- אין מחיר Amazon סטטי ליד קישור.
- מדריך המתחילים כולל מקורות וניסוח מסויג.
- FAQ גלוי תואם ל-FAQPage JSON-LD.
- Focus נראה במקלדת.
- תפריט מובייל נגיש.
- אין Console Errors.
- כל הקישורים הפנימיים המרכזיים מחזירים עמוד תקין.

---

## 21. Acceptance Criteria ל-Phase 2

- `DIY & Budget` מופיע בניווט בכל העמודים.
- `About Us` עדיין נגיש מהפוטר.
- ה-DIY Hub עובד במובייל ובמחשב.
- שלושת מסלולי ההחלטה ברורים.
- אין חיווט או הוראות מסוכנות.
- קיימים קישורים ל-Calculator, Finder, Best Cold Plunges ו-DIY Ideas.
- אזור Build It or Buy It נמצא בעמוד הבית.
- sitemap ו-canonical מעודכנים.
- אין תוכן כפול משמעותי.
- `diy_path_selected` נמדד כאשר GA4 פעיל.
- העמוד עבר QA של GPT ואישור בועז.

---

## 22. דברים שקלוד לא יבצע ללא אישור מפורש

- החלפת Framework.
- שינוי לוגו.
- שינוי פלטת צבעים.
- מחיקת עמודים חיים.
- שינוי דומיין.
- מעבר מ-`.html` ל-Clean URLs.
- הוספת Review או AggregateRating Schema.
- הכנסת מחירים.
- יצירת פרופיל מומחה.
- חיבור ספק מייל.
- חיבור GA4 עם מזהה מומצא.
- הוספת API Key לקוד.
- רכישת שירות או מנוי.
- יצירת עשרות מאמרים.
- פרסום Reddit/Quora.
- שינוי תנאים משפטיים מהותיים.

---

## 23. דוח המסירה הנדרש מקלוד

לאחר כל Phase, החזר:

```text
1. Summary
2. Files created
3. Files modified
4. Claims removed or qualified
5. Sources added
6. Links tested
7. Mobile flows tested
8. Accessibility checks
9. Analytics events changed
10. SEO/schema changes
11. Remaining risks
12. Manual actions required from Boaz
13. Changelog entry
14. Commit hash
```

אין לכתוב “הכול עובד” ללא פירוט בדיקות.

---

## 24. סדר העדיפות הנוכחי

1. Production Trust Fix.
2. הפעלת מדידה תקינה.
3. DIY Hub וניווט.
4. DIY vs. Ready-Made.
5. Stock Tank Guide.
6. Filtration Guide.
7. חיבור ספק מייל.
8. תוכן Hands-On.
9. דומיין עצמאי.
10. הרחבת תוכן ושיווק.

---

## 25. הגדרת סיום

משימה נחשבת גמורה רק כאשר:

- הקוד ב-GitHub.
- Netlify פרסם אותו.
- האתר החי נבדק.
- GPT אישר QA.
- בועז אישר את התוצאה.
- `CURRENT_STATUS.md` עודכן.
- `CHANGELOG.md` עודכן.
- `BACKLOG.md` עודכן.

אין להסתמך על שיחה קודמת או על זיכרון של כלי AI.
