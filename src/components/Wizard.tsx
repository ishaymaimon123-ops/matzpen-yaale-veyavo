'use client';
import { useState } from 'react';
import { festivalOccasions, occasionLabels, resolveHalachicGuidance, sources, type Occasion, type Position, type Prayer, type Tradition } from '@/lib/guidance';
import type { DayInfo } from '@/lib/calendar';

type Step = 'tradition' | 'occasion' | 'prayer' | 'position' | 'named' | 'signed' | 'opening' | 'result';
const weekdayPositions: { value: Position; title: string; hint: string }[] = [
  { value:'before-signature', title:'עדיין בתוך ״רצה״', hint:'עוד לא אמרתי ״ברוך אתה ה׳״ בסוף הברכה' },
  { value:'said-name', title:'התחלתי את חתימת הברכה', hint:'אמרתי ״ברוך אתה ה׳״, אך לא ״המחזיר שכינתו לציון״' },
  { value:'after-retzeh', title:'סיימתי ״רצה״', hint:'אמרתי ״המחזיר שכינתו לציון״, אך לא התחלתי ״מודים״' },
  { value:'after-modim', title:'התחלתי ״מודים״ או שאני בהמשך', hint:'כולל אמצע ״שים שלום״' },
  { value:'elohei-netzor', title:'אני ב״אלוהי נצור״', hint:'לפני ״יהיו לרצון״ האחרון' },
  { value:'last-yihyu', title:'אמרתי ״יהיו לרצון״ האחרון', hint:'גם אם עוד לא פסעתי לאחור' },
  { value:'finished', title:'סיימתי ועקרתי את רגליי', hint:'כבר פסעתי לאחור' },
];
const festivalPositions: { value: Position; title: string; hint: string }[] = [
  { value:'middle-blessing', title:'אני עדיין בברכה האמצעית', hint:'בברכת קדושת היום, לפני החתימה' },
  { value:'after-middle-blessing', title:'סיימתי את הברכה האמצעית', hint:'כבר אמרתי את חתימת ברכת קדושת היום' },
  { value:'after-modim', title:'אני ב״מודים״ או בהמשך', hint:'כולל ״שים שלום״' },
  { value:'elohei-netzor', title:'אני ב״אלוהי נצור״', hint:'לפני ״יהיו לרצון״ האחרון' },
  { value:'last-yihyu', title:'אמרתי ״יהיו לרצון״ האחרון', hint:'לפני או אחרי הפסיעות' },
  { value:'finished', title:'סיימתי את העמידה', hint:'כבר סיימתי ופסעתי לאחור' },
];
const prayerLabels: Record<Prayer,string> = { maariv:'ערבית', shacharit:'שחרית', mincha:'מנחה' };
export function Wizard({ day }: { day: DayInfo }) {
  const [step,setStep] = useState<Step>('tradition');
  const [tradition,setTradition] = useState<Tradition | null>(null);
  const [occasion,setOccasion] = useState<Occasion | null>(null);
  const [prayer,setPrayer] = useState<Prayer | null>(null);
  const [position,setPosition] = useState<Position | null>(null);
  const [namedDay,setNamedDay] = useState<boolean | null>(null);
  const [signedProperly,setSignedProperly] = useState<boolean | null>(null);
  const [saidOpening,setSaidOpening] = useState<boolean | null>(null);
  const [manual,setManual] = useState(false);
  const isFestival = occasion ? festivalOccasions.includes(occasion) : false;
  const selectOccasion = (value: Occasion) => { setOccasion(value); setStep('prayer'); };
  const selectPosition = (value: Position) => { setPosition(value); if (isFestival) setStep('named'); else setStep('result'); };
  const restart = () => { setStep('tradition'); setTradition(null); setOccasion(null); setPrayer(null); setPosition(null); setNamedDay(null); setSignedProperly(null); setSaidOpening(null); setManual(false); };
  const needsOpening = tradition==='ashkenazi' && occasion && !['rosh-hashana','yom-kippur'].includes(occasion);
  const back = () => { if(step==='result') setStep(isFestival && namedDay===false && position!=='middle-blessing'?(signedProperly && needsOpening?'opening':'signed'):isFestival?'named':'position'); else if(step==='opening') setStep('signed'); else if(step==='signed') setStep('named'); else if(step==='named') setStep('position'); else if(step==='position') setStep('prayer'); else if(step==='prayer') setStep('occasion'); else if(step==='occasion') setStep('tradition'); };
  const result = step==='result' && tradition && occasion && prayer && position ? resolveHalachicGuidance({tradition,occasion,prayer,position,namedDay:namedDay ?? undefined,signedProperly:signedProperly ?? undefined,saidOpening:saidOpening ?? undefined}) : null;
  return <section className="wizard" aria-labelledby="wizard-title">
    <div className="wizard-top"><span className="eyebrow">מדריך מיידי לתפילת העמידה</span><span className="step-count">{step==='result'?'התשובה שלך':`שלב ${step==='tradition'?1:step==='occasion'?2:step==='prayer'?3:step==='position'?4:5}`}</span></div>
    {step==='tradition' && <><h2 id="wizard-title">לפי איזה מנהג אתה נוהג?</h2><p className="step-intro">בחר כדי לקבל הוראה עם המקורות המתאימים למנהגך.</p><div className="choice-grid">{([['sephardi','ספרדי','פסיקת מרן השולחן ערוך והפוסקים הספרדיים'],['ashkenazi','אשכנזי','שולחן ערוך, רמ״א ומשנה ברורה']] as const).map(([value,title,hint])=><button className="choice" key={value} onClick={()=>{setTradition(value);setStep('occasion')}}><strong>{title}</strong><span>{hint}</span><b aria-hidden="true">←</b></button>)}</div></>}
    {step==='occasion' && <><h2 id="wizard-title">באיזה מועד מדובר?</h2>{day.occasion && !manual ? <div className="today-choice"><span>לפי לוח ארץ ישראל</span><strong>זיהינו שהיום: {day.description}</strong><button className="primary" onClick={()=>selectOccasion(day.occasion!)}>המשך עם המועד של היום <span aria-hidden="true">←</span></button><button className="text-button" onClick={()=>setManual(true)}>בחר מועד אחר</button></div> : <>{!day.occasion && <p className="notice">היום אינו יום שבו אומרים יעלה ויבוא בתפילת העמידה. אפשר לבחור מועד אחר לבדיקה.</p>}<div className="option-list">{(Object.keys(occasionLabels) as Occasion[]).map(value=><button className="option" key={value} onClick={()=>selectOccasion(value)}>{occasionLabels[value]} <span aria-hidden="true">←</span></button>)}</div></>}</>}
    {step==='prayer' && <><h2 id="wizard-title">באיזו תפילה אתה?</h2><p className="step-intro">{occasion && occasionLabels[occasion]}</p><div className="option-list">{(Object.keys(prayerLabels) as Prayer[]).map(value=><button className="option" key={value} onClick={()=>{setPrayer(value);setStep('position')}}>{prayerLabels[value]} <span aria-hidden="true">←</span></button>)}</div></>}
    {step==='position' && <><h2 id="wizard-title">איפה אתה נמצא עכשיו?</h2><p className="step-intro">בחר את המשפט הקרוב ביותר למקום שלך בתפילה.</p><div className="option-list">{(isFestival?festivalPositions:weekdayPositions).map(item=><button className="option detailed" key={item.value} onClick={()=>selectPosition(item.value)}><span><strong>{item.title}</strong><small>{item.hint}</small></span><span aria-hidden="true">←</span></button>)}</div></>}
    {step==='named' && <><h2 id="wizard-title">האם כבר הזכרת את שם המועד?</h2><p className="step-intro">בברכה האמצעית, למשל ״את יום חג המצות הזה״. יש להבחין בין שכחת המילים ״יעלה ויבוא״ לבין אי הזכרת קדושת היום.</p><div className="option-list"><button className="option" onClick={()=>{setNamedDay(true);setStep('result')}}>כן, הזכרתי את קדושת היום ואת שם המועד{position!=='middle-blessing'?' וחתמתי כראוי':''} <span aria-hidden="true">←</span></button><button className="option" onClick={()=>{setNamedDay(false);setStep(position==='middle-blessing'?'result':'signed')}}>לא, לא הזכרתי את שם המועד <span aria-hidden="true">←</span></button></div></>}
    {step==='signed' && <><h2 id="wizard-title">איך חתמת את הברכה האמצעית?</h2><p className="step-intro">החתימה היא סוף הברכה שלפני ״רצה״. היא משפיעה על התשובה במקרה שלא הזכרת את שם המועד.</p><div className="option-list"><button className="option" onClick={()=>{setSignedProperly(true);setStep(needsOpening?'opening':'result')}}>חתמתי בחתימה הנכונה של היום <span aria-hidden="true">←</span></button><button className="option" onClick={()=>{setSignedProperly(false);setStep('result')}}>לא חתמתי כראוי <span aria-hidden="true">←</span></button></div></>}
    {step==='opening' && <><h2 id="wizard-title">האם אמרת ״אתה בחרתנו״?</h2><p className="step-intro">זו תחילת הברכה האמצעית של יום טוב. פרט זה משנה את הדין במקרה שבו שם החג לא נאמר.</p><div className="option-list"><button className="option" onClick={()=>{setSaidOpening(true);setStep('result')}}>כן, אמרתי ״אתה בחרתנו״ <span aria-hidden="true">←</span></button><button className="option" onClick={()=>{setSaidOpening(false);setStep('result')}}>לא, אמרתי רק ״והשיאנו״ <span aria-hidden="true">←</span></button></div></>}
    {step==='result' && result && <div className="result"><span className="result-kicker">{occasion && occasionLabels[occasion]} · {prayer && prayerLabels[prayer]}</span><h2 id="wizard-title">מה לעשות עכשיו</h2><p className="result-action">{result.action}</p><div className="result-detail"><h3>למה?</h3><p>{result.explanation}</p><h3>מקור</h3><ul>{result.sourceIds.map(id=><li key={id}><a href={sources[id].url} target="_blank" rel="noopener noreferrer">{sources[id].label} ↗</a></li>)}</ul></div><div className="result-buttons"><button className="primary" onClick={restart}>בדיקה חדשה</button><button className="secondary" onClick={back}>חזרה לשלב הקודם</button></div></div>}
    {step!=='tradition' && step!=='result' && <button className="back" onClick={back}>→ חזרה לשלב הקודם</button>}
  </section>;
}
