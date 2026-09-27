import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
export const runtime='nodejs';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(254),message:z.string().trim().min(10).max(3000),company:z.string().max(200).optional().default(''),startedAt:z.coerce.number().int()});
const hits=new Map<string,{count:number;until:number}>();
const fail=(message:string,status:number)=>NextResponse.json({message},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
  if((request.headers.get('content-type')||'').split(';')[0]!=='application/json') return fail('בקשה לא תקינה.',415);
  const origin=request.headers.get('origin');
  if(origin && new URL(origin).host!==request.headers.get('host')) return fail('בקשה לא תקינה.',403);
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
  const now=Date.now();const hit=hits.get(ip);if(hit&&hit.until>now&&hit.count>=3)return fail('נשלחו יותר מדי פניות. נסו שוב מאוחר יותר.',429);
  let raw:unknown;try{raw=await request.json()}catch{return fail('בדקו את פרטי הטופס ונסו שוב.',400)}
  const parsed=schema.safeParse(raw);if(!parsed.success)return fail('בדקו את פרטי הטופס ונסו שוב.',400);
  const {name,email,message,company,startedAt}=parsed.data;
  if(company)return NextResponse.json({ok:true});
  if(now-startedAt<1500||now-startedAt>86400000)return fail('נסו למלא את הטופס מחדש.',400);
  hits.set(ip,{count:hit&&hit.until>now?hit.count+1:1,until:now+3600000});
  const to=process.env.CONTACT_TO_EMAIL,apiKey=process.env.RESEND_API_KEY,from=process.env.CONTACT_FROM_EMAIL;
  if(!to||!apiKey||!from){console.error('Contact mail environment is incomplete');return fail('שליחת ההודעה אינה זמינה כרגע. נסו שוב מאוחר יותר.',503)}
  try{const resend=new Resend(apiKey);const result=await resend.emails.send({from,to,replyTo:email,subject:'פנייה חדשה – מצפן יעלה ויבוא',text:`שם: ${name}\nאימייל: ${email}\nתאריך ושעה: ${new Date(now).toLocaleString('he-IL',{timeZone:'Asia/Jerusalem'})}\n\nתוכן הפנייה:\n${message}`});if(result.error)throw result.error;return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}})}catch(error){console.error('Contact delivery failed',error instanceof Error?error.message:'unknown');return fail('לא הצלחנו לשלוח את ההודעה. נסו שוב מאוחר יותר.',502)}
}
