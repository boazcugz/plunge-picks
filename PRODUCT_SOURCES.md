# PRODUCT_SOURCES — Plunge Picks

> מקור ותאריך אימות לכל נתון מוצר. כלל: נתון ללא מקור מסומן `verify:true` ואינו מוצג כעובדה.
> מקור התוכן: `products.js` (`window.PLUNGE_PRODUCTS`). המסמך הזה מלווה אותו.

**סטטוסים:** ✅ מאומת ממקור יצרן | ⚠️ דורש אימות (`verify:true`) | 🔗 קישור לתיקון

---

## 1. The Cold Plunge (`the-cold-plunge`)
- **סטטוס:** ✅ מאומת חלקית.
- טמפ' מינ': 39°F — מאומת ממפרט יצרן.
- דורש רענון: מידות, משקל, אחריות, מדיניות החזרה, תאריך אימות.

## 2. Sun Home Cold Plunge Pro (`sun-home-cold-plunge-pro`)
- **סטטוס:** ✅ מאומת חלקית.
- טמפ' מינ': 32°F; משקל ~345lbs — מאומת ממפרט יצרן.
- דורש רענון: מידות פנים, אחריות, החזרה, תאריך אימות.

## 3. Hydragun Supertub (`hydragun-supertub`)
- **סטטוס:** ⚠️ דורש אימות מלא.
- לאמת: טמפ' מינ', מידות, משקל, chiller included/compatible, אחריות, מדיניות החזרה.

## 4. Polar Monkeys Brainpod 2.0 (`polar-monkeys-brainpod-2`)
- **סטטוס:** ⚠️ דורש אימות מלא.
- לאמת: טמפ' מינ', מידות, משקל, סוג קירור, אחריות.

## 5. Nordic Wave Viking (`nordic-wave-viking`)
- **סטטוס:** ⚠️ דורש אימות מלא.
- לאמת: טמפ' מינ', מידות, משקל, סוג קירור, אחריות.

## 6. The Cold Pod (`the-cold-pod`)
- **סטטוס:** ⚠️ דורש אימות מלא + 🔗 קישור.
- לאמת: מידות, משקל, חומר, אחריות.
- קישור אמזון כרגע **חיפוש גנרי** → להחליף ב-Special Link מדויק (SiteStripe).

## 7. Stock Tank DIY (`stock-tank-diy`)
- **סטטוס:** ⚠️ דורש אימות + 🔗 קישור.
- זהו פתרון DIY — לוודא שהתיאור לא מרמז על מוצר-מדף אחד ספציפי.
- קישור אמזון כרגע **חיפוש גנרי** → להחליף ב-Special Link.

---

## נוהל אימות נתון
1. פותחים את עמוד היצרן/הרשמי של המוצר.
2. מעתיקים את הנתון **כפי שהיצרן מציג אותו** (טענת יצרן, לא מסקנה).
3. מעדכנים ב-`products.js`: הערך + `verifiedDate` + הסרת `verify:true`.
4. אם היצרן לא מפרסם נתון — משאירים `verify:true` ומציגים "Not confirmed".
5. רושמים כאן: מה אומת, מאיזה מקור, בְּאיזה תאריך.

## שדות המפתח ב-products.js
`slug, name, brand, merchant, affiliateUrl, priceCategory, coolingType, chillerIncluded, chillerCompatible, minTempF, heating, portable, indoor, outdoor, upgradeable, bestFor, limitation, verifiedDate, verify, notes`
