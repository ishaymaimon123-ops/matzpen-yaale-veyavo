import { HDate, Location, Zmanim, flags, getHolidaysOnDate } from '@hebcal/core';
import type { Occasion } from './guidance';

const jerusalem = Location.lookup('Jerusalem') ?? new Location(31.778, 35.235, true, 'Asia/Jerusalem', 'Jerusalem');
const dateParts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' });
const weekdayFormat = new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', weekday: 'long' });
export type DayInfo = { hebrewDate: string; weekday: string; occasion: Occasion | null; description: string; sunset: string; afterSunset: boolean };

export function getJerusalemDay(now = new Date()): DayInfo {
  const parts = Object.fromEntries(dateParts.formatToParts(now).map(p => [p.type, p.value]));
  const civil = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), 12));
  const sunset = new Zmanim(jerusalem, civil, false).sunset();
  const afterSunset = now.getTime() >= sunset.getTime();
  const observedCivil = new Date(civil.getTime() + (afterSunset ? 86400000 : 0));
  const hd = new HDate(observedCivil);
  const events = getHolidaysOnDate(hd, true) ?? [];
  const descriptions = events.map(event => event.getDesc());
  const has = (flag: number) => events.some(event => (event.getFlags() & flag) !== 0);
  const match = (pattern: RegExp) => descriptions.some(desc => pattern.test(desc));
  let occasion: Occasion | null = null;
  let description = '';
  if (match(/Hoshana Raba|Hoshana Rabba/i)) { occasion = 'hoshana-rabba'; description = 'הושענא רבה'; }
  else if (match(/Shmini Atzeret|Simchat Torah/i)) { occasion = 'shemini-atzeret'; description = 'שמיני עצרת / שמחת תורה'; }
  else if (match(/Yom Kippur/i)) { occasion = 'yom-kippur'; description = 'יום כיפור'; }
  else if (match(/Rosh Hashana/i)) { occasion = 'rosh-hashana'; description = 'ראש השנה'; }
  else if (match(/Shavuot/i)) { occasion = 'shavuot'; description = 'שבועות'; }
  else if (match(/Sukkot/i) && has(flags.CHOL_HAMOED)) { occasion = 'sukkot-chol'; description = 'חול המועד סוכות'; }
  else if (match(/Sukkot/i) && has(flags.CHAG)) { occasion = 'sukkot-yom-tov'; description = 'יום טוב סוכות'; }
  else if (match(/Pesach/i) && has(flags.CHOL_HAMOED)) { occasion = 'pesach-chol'; description = 'חול המועד פסח'; }
  else if (match(/Pesach/i) && has(flags.CHAG)) { occasion = 'pesach-yom-tov'; description = 'יום טוב פסח'; }
  else if (has(flags.ROSH_CHODESH)) { occasion = 'rosh-chodesh'; description = 'ראש חודש'; }
  return { hebrewDate: hd.renderGematriya(true), weekday: weekdayFormat.format(observedCivil), occasion, description, sunset: sunset.toISOString(), afterSunset };
}
