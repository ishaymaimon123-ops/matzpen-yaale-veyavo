# מצפן יעלה ויבוא

כלי אינטרנטי מהיר לבירור ההוראה המעשית במקרה של שכחת יעלה ויבוא בתפילת העמידה. עברית, RTL, לוח ארץ ישראל והחלטות דטרמיניסטיות עם מקור לכל תשובה.

## פיתוח

Node.js 20 ומעלה:

```bash
pnpm install
pnpm dev
```

בדיקות: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.

## תצורת Production

יש להגדיר בצד השרת את `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (דומיין מאומת ב־Resend). יש להגדיר `NEXT_PUBLIC_SITE_URL` לכתובת האתר הציבורית לצורך canonical ו־sitemap. אין להעלות ערכי סודות ל־Git.

טבלת אימות כללי הפסיקה: [docs/halachic-sources.md](docs/halachic-sources.md).
