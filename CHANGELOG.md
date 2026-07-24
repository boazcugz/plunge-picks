# CHANGELOG — Plunge Picks

> כל שינוי מהותי, מהחדש לישן. פורמט: `[תאריך] — כותרת` + קבצים שהשתנו.
> החל מגרסת הפרוטוקול, כל מסירה מקלוד מוסיפה כאן רשומה.

---

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
