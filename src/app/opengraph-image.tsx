import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
export const size={width:1200,height:630};export const contentType='image/png';
// Satori shapes Hebrew letters but lays words out left-to-right; keep glyph order and reverse the word sequence.
const satoriRtlText=(text:string)=>text.split(' ').reverse().join(' ');
export default async function Image(){const font=await readFile(join(process.cwd(),'public/fonts/noto-serif-hebrew-700.woff'));return new ImageResponse(<div style={{width:'100%',height:'100%',background:'#f7f6f1',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',color:'#263f54',fontFamily:'Noto Serif Hebrew',direction:'rtl'}}><div style={{width:90,height:90,border:'3px solid #b18c55',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:30}}><div style={{width:18,height:18,background:'#b18c55',transform:'rotate(45deg)'}}/></div><div style={{fontSize:82,fontWeight:700,textAlign:'center',direction:'rtl'}}>{satoriRtlText('מצפן יעלה ויבוא')}</div><div style={{fontSize:38,marginTop:15,textAlign:'center',direction:'rtl'}}>{satoriRtlText('שכחת יעלה ויבוא גלה מיד מה לעשות')}</div></div>,{...size,fonts:[{name:'Noto Serif Hebrew',data:font,style:'normal',weight:700}]})}
