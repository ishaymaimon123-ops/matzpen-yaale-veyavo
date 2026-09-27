export type Tradition = 'sephardi' | 'ashkenazi';
export type Occasion = 'rosh-chodesh' | 'pesach-yom-tov' | 'pesach-chol' | 'shavuot' | 'sukkot-yom-tov' | 'sukkot-chol' | 'hoshana-rabba' | 'shemini-atzeret' | 'rosh-hashana' | 'yom-kippur';
export type Prayer = 'maariv' | 'shacharit' | 'mincha';
export type Position = 'before-signature' | 'said-name' | 'after-retzeh' | 'after-modim' | 'elohei-netzor' | 'last-yihyu' | 'finished' | 'middle-blessing' | 'after-middle-blessing';
export type GuidanceInput = { tradition: Tradition; occasion: Occasion; prayer: Prayer; position: Position; namedDay?: boolean; signedProperly?: boolean; saidOpening?: boolean };
export type Source = { id: string; label: string; url: string };
export type Rule = { id: string; structure: 'weekday' | 'festival'; traditions: readonly Tradition[]; occasions: readonly Occasion[]; prayers: readonly Prayer[]; positions: readonly Position[]; namedDay?: boolean; signedProperly?: boolean; saidOpening?: boolean; action: string; explanation: string; sourceIds: readonly string[] };

export const sources: Record<string, Source> = {
  sa422: { id: 'sa422', label: 'שולחן ערוך, אורח חיים תכ״ב, א׳', url: 'https://he.wikisource.org/wiki/שולחן_ערוך_אורח_חיים_תכב' },
  mb422: { id: 'mb422', label: 'משנה ברורה, תכ״ב, ס״ק ב׳, ה׳–ט׳', url: 'https://he.wikisource.org/wiki/משנה_ברורה_על_אורח_חיים_תכב' },
  sa490: { id: 'sa490', label: 'שולחן ערוך, אורח חיים ת״צ, ב׳, ט׳', url: 'https://he.wikisource.org/wiki/שולחן_ערוך_אורח_חיים_תצ' },
  sa122: { id: 'sa122', label: 'שולחן ערוך, אורח חיים קכ״ב, א׳–ב׳', url: 'https://he.wikisource.org/wiki/שולחן_ערוך_אורח_חיים_קכב' },
  sa487: { id: 'sa487', label: 'שולחן ערוך, אורח חיים תפ״ז, א׳, ג׳ והגהת הרמ״א', url: 'https://he.wikisource.org/wiki/שולחן_ערוך_אורח_חיים_תפז' },
  mb487: { id: 'mb487', label: 'משנה ברורה, תפ״ז, ס״ק י״א–י״ב', url: 'https://he.wikisource.org/wiki/משנה_ברורה_על_אורח_חיים_תפז' },
  yalkut: { id: 'yalkut', label: 'ילקוט יוסף, הלכות ראש חודש, סימנים תכ״א–תכ״ב', url: 'https://itim-latora.org/כתבים/קיצור-שולחן-ערוך-ילקוט-יוסף/?page=434' },
  yalkut529: { id: 'yalkut529', label: 'ילקוט יוסף, הלכות יום טוב, סימן תקכ״ט', url: 'https://moreshet-maran.com/maagar-halachot/סימן-תקכט-תפלה-ביום-טוב-ובחול-המועד/' },
  sa582: { id: 'sa582', label: 'שולחן ערוך, אורח חיים תקפ״ב, ו׳', url: 'https://he.wikisource.org/wiki/שולחן_ערוך_אורח_חיים_תקפב' },
};
export const traditions: Tradition[] = ['sephardi', 'ashkenazi'];
export const prayers: Prayer[] = ['maariv', 'shacharit', 'mincha'];
export const weekdayOccasions: Occasion[] = ['rosh-chodesh', 'pesach-chol', 'sukkot-chol', 'hoshana-rabba'];
export const festivalOccasions: Occasion[] = ['pesach-yom-tov', 'shavuot', 'sukkot-yom-tov', 'shemini-atzeret', 'rosh-hashana', 'yom-kippur'];
export const occasionLabels: Record<Occasion, string> = {
  'rosh-chodesh': 'ראש חודש', 'pesach-yom-tov': 'פסח – יום טוב', 'pesach-chol': 'פסח – חול המועד', shavuot: 'שבועות', 'sukkot-yom-tov': 'סוכות – יום טוב', 'sukkot-chol': 'סוכות – חול המועד', 'hoshana-rabba': 'הושענא רבה', 'shemini-atzeret': 'שמיני עצרת / שמחת תורה', 'rosh-hashana': 'ראש השנה', 'yom-kippur': 'יום כיפור'
};
const both = traditions;
const days = prayers;
const weekdays = weekdayOccasions;
const chol = ['sa490', 'sa422', 'sa122'];
const rule = (r: Rule): Rule => r;
export const rules: Rule[] = [
  rule({id:'RC-NIGHT-IN',structure:'weekday',traditions:both,occasions:['rosh-chodesh'],prayers:['maariv'],positions:['before-signature'],action:'אמור עכשיו יעלה ויבוא והמשך את ברכת רצה.',explanation:'כל עוד אתה בתוך הברכה ולפני חתימתה, אפשר להשלים את ההזכרה במקומה.',sourceIds:['sa422','mb422']}),
  rule({id:'RC-NIGHT-OUT',structure:'weekday',traditions:both,occasions:['rosh-chodesh'],prayers:['maariv'],positions:['said-name','after-retzeh','after-modim','elohei-netzor','last-yihyu','finished'],action:'אל תחזור. המשך את התפילה כרגיל.',explanation:'בערבית של ראש חודש אין מחזירים על שכחת יעלה ויבוא; לאחר אמירת שם ה׳ בחתימת רצה אין מתקנים בהחזרת הברכה.',sourceIds:['sa422','mb422']}),
  rule({id:'WEEKDAY-IN',structure:'weekday',traditions:both,occasions:weekdays,prayers:days,positions:['before-signature'],action:'אמור עכשיו יעלה ויבוא והמשך את ברכת רצה.',explanation:'עדיין לא חתמת את ברכת רצה, ולכן ההזכרה נאמרת במקום שנזכרת.',sourceIds:chol}),
  rule({id:'WEEKDAY-NAME',structure:'weekday',traditions:both,occasions:weekdays,prayers:days,positions:['said-name'],action:'אמור ״למדני חוקיך״, חזור ואמור יעלה ויבוא, ואז המשך את ברכת רצה.',explanation:'כך משלימים את הפסוק לאחר שם ה׳ וחוזרים להזכרת היום לפני חתימת הברכה.',sourceIds:['mb422','yalkut','sa490']}),
  rule({id:'WEEKDAY-BETWEEN',structure:'weekday',traditions:both,occasions:weekdays,prayers:days,positions:['after-retzeh'],action:'אמור יעלה ויבוא כאן, ואז המשך ל״מודים״.',explanation:'עדיין לא התחלת את הברכה הבאה, ולכן אפשר לומר את ההזכרה כעת.',sourceIds:chol}),
  rule({id:'WEEKDAY-RETURN-RETZEH',structure:'weekday',traditions:both,occasions:weekdays,prayers:days,positions:['after-modim','elohei-netzor'],action:'חזור לתחילת ברכת ״רצה״, אמור יעלה ויבוא והמשך משם כסדר.',explanation:'משהתחלת מודים, יש לחזור לרצה. גם בזמן התחנונים שלפני סיום התפילה חוזרים לרצה.',sourceIds:chol}),
  rule({id:'WEEKDAY-RESTART',structure:'weekday',traditions:both,occasions:weekdays,prayers:days,positions:['last-yihyu','finished'],action:'חזור לראש תפילת העמידה.',explanation:'לאחר שסיימת את התחנונים ואמרת יהיו לרצון האחרון, התפילה נחשבת שהושלמה גם אם טרם פסעת.',sourceIds:['sa422','mb422','sa122','sa490']}),
  rule({id:'FESTIVAL-NAMED-IN',structure:'festival',traditions:both,occasions:festivalOccasions,prayers:days,positions:['middle-blessing'],namedDay:true,action:'אמור עכשיו יעלה ויבוא, והמשך את הברכה האמצעית.',explanation:'עדיין לא חתמת את ברכת קדושת היום, ולכן אפשר להשלים את ההזכרה במקומה.',sourceIds:['sa487']}),
  rule({id:'FESTIVAL-NAMED-LATER',structure:'festival',traditions:both,occasions:['pesach-yom-tov','shavuot','sukkot-yom-tov','shemini-atzeret'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor','last-yihyu','finished'],namedDay:true,action:'המשך בתפילה כרגיל. אין לחזור רק בגלל שהשמטת את המילים ״יעלה ויבוא״.',explanation:'אם הזכרת כראוי את קדושת היום ואת שם המועד בברכה האמצעית וחתמת כראוי, עיקר הזכרת היום כבר נאמרה.',sourceIds:['sa487','mb487']}),
  rule({id:'HIGH-HOLIDAY-NAMED-LATER-UNCERTAIN',structure:'festival',traditions:both,occasions:['rosh-hashana','yom-kippur'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor','last-yihyu','finished'],namedDay:true,action:'במקרה הזה יש פרטים נוספים שמשפיעים על הדין. מומלץ לשאול רב.',explanation:'נוסח הברכה האמצעית בימים הנוראים שונה מנוסח יום טוב, ואין כאן מקור מספיק להורות על חזרה או אי־חזרה בכל המקרים.',sourceIds:['sa582','sa487','mb487']}),
  rule({id:'FESTIVAL-NOT-NAMED-IN',structure:'festival',traditions:both,occasions:festivalOccasions,prayers:days,positions:['middle-blessing'],namedDay:false,action:'הזכר עכשיו את קדושת היום ושם המועד, אמור יעלה ויבוא והמשך את הברכה.',explanation:'הברכה האמצעית טרם נחתמה ואפשר לתקן בתוכה.',sourceIds:['sa487','mb487']}),
  rule({id:'FESTIVAL-SEPHARDI-GENERIC',structure:'festival',traditions:['sephardi'],occasions:['pesach-yom-tov','shavuot','sukkot-yom-tov','shemini-atzeret'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor','last-yihyu','finished'],namedDay:false,signedProperly:true,action:'המשך בתפילה כרגיל; אין צורך לחזור.',explanation:'לפי ילקוט יוסף, מי שהשמיט את שם החג בפרטות אך חתם ״מקדש ישראל והזמנים״ יצא ידי חובה.',sourceIds:['yalkut529','sa487']}),
  rule({id:'FESTIVAL-ASHKENAZI-GENERIC-IN',structure:'festival',traditions:['ashkenazi'],occasions:['pesach-yom-tov','shavuot','sukkot-yom-tov','shemini-atzeret'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor'],namedDay:false,signedProperly:true,saidOpening:false,action:'חזור לתחילת הברכה האמצעית, הזכר את שם החג והמשך כסדר.',explanation:'כאשר דילגת גם על ״אתה בחרתנו״ וגם על יעלה ויבוא, ואמרת רק ״והשיאנו״ בלי שם החג, המשנה ברורה פוסק שלא יצאת.',sourceIds:['mb487','sa487']}),
  rule({id:'FESTIVAL-ASHKENAZI-GENERIC-END',structure:'festival',traditions:['ashkenazi'],occasions:['pesach-yom-tov','shavuot','sukkot-yom-tov','shemini-atzeret'],prayers:days,positions:['last-yihyu','finished'],namedDay:false,signedProperly:true,saidOpening:false,action:'חזור לראש תפילת העמידה.',explanation:'כאשר דילגת גם על ״אתה בחרתנו״ וגם על יעלה ויבוא, ואמרת רק ״והשיאנו״ בלי שם החג, המשנה ברורה פוסק שלא יצאת.',sourceIds:['mb487','sa122']}),
  rule({id:'FESTIVAL-ASHKENAZI-OPENING-UNCERTAIN',structure:'festival',traditions:['ashkenazi'],occasions:['pesach-yom-tov','shavuot','sukkot-yom-tov','shemini-atzeret'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor','last-yihyu','finished'],namedDay:false,signedProperly:true,saidOpening:true,action:'במקרה הזה יש פרטים נוספים שמשפיעים על הדין. מומלץ לשאול רב.',explanation:'המשנה ברורה דן במפורש במקרה שבו דילגו גם על ״אתה בחרתנו״. כאשר נוסח זה נאמר אך שם החג הושמט, אין כאן מקור מספיק להורות על חזרה.',sourceIds:['mb487','sa487']}),
  rule({id:'FESTIVAL-WRONG-CLOSING-IN',structure:'festival',traditions:both,occasions:festivalOccasions,prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor'],namedDay:false,signedProperly:false,action:'במקרה הזה יש פרטים נוספים שמשפיעים על הדין. מומלץ לשאול רב.',explanation:'הדין תלוי במילים המדויקות של החתימה, במנהג ובשאלה אם חל גם שבת.',sourceIds:['mb487','yalkut529']}),
  rule({id:'FESTIVAL-WRONG-CLOSING-END',structure:'festival',traditions:both,occasions:festivalOccasions,prayers:days,positions:['last-yihyu','finished'],namedDay:false,signedProperly:false,action:'במקרה הזה יש פרטים נוספים שמשפיעים על הדין. מומלץ לשאול רב.',explanation:'הדין תלוי במילים המדויקות של החתימה, במנהג ובשאלה אם חל גם שבת.',sourceIds:['mb487','sa122','yalkut529']}),
  rule({id:'HIGH-HOLIDAY-UNCERTAIN',structure:'festival',traditions:both,occasions:['rosh-hashana','yom-kippur'],prayers:days,positions:['after-middle-blessing','after-modim','elohei-netzor','last-yihyu','finished'],namedDay:false,signedProperly:true,action:'במקרה הזה יש פרטים נוספים שמשפיעים על הדין. מומלץ לשאול רב.',explanation:'נוסח קדושת היום בראש השנה וביום כיפור דורש בירור ממוקד של ההזכרות שנאמרו בפועל.',sourceIds:['sa582','sa487','mb487']}),
];
export function resolveHalachicGuidance(input: GuidanceInput): Rule {
  const structure = weekdayOccasions.includes(input.occasion) ? 'weekday' : 'festival';
  const matches = rules.filter(r => !(input.occasion === 'rosh-chodesh' && input.prayer === 'maariv' && r.id.startsWith('WEEKDAY-')) && r.structure === structure && r.traditions.includes(input.tradition) && r.occasions.includes(input.occasion) && r.prayers.includes(input.prayer) && r.positions.includes(input.position) && (r.namedDay === undefined || r.namedDay === input.namedDay) && (r.signedProperly === undefined || r.signedProperly === input.signedProperly) && (r.saidOpening === undefined || r.saidOpening === input.saidOpening));
  if (matches.length !== 1) throw new Error(`Expected one verified rule, got ${matches.length}`);
  return matches[0];
}
