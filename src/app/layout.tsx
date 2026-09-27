import type { Metadata } from 'next';
import Link from 'next/link';
import { CompassIcon } from '@/components/CompassIcon';
import '@fontsource/heebo/hebrew-400.css';
import '@fontsource/heebo/hebrew-500.css';
import '@fontsource/heebo/hebrew-700.css';
import '@fontsource/noto-serif-hebrew/hebrew-700.css';
import './globals.css';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://matzpen-yaale-veyavo.vercel.app';
const shareImage = '/opengraph-image?v=3';
export const metadata: Metadata = { metadataBase: new URL(base), title: { default:'מצפן יעלה ויבוא | שכחת יעלה ויבוא? מה עושים עכשיו', template:'%s | מצפן יעלה ויבוא' }, description:'שכחת יעלה ויבוא באמצע תפילת העמידה? בחר מנהג, מועד והמקום שבו נזכרת וקבל מיד מה לעשות ולאן לחזור, עם מקור הלכתי.', alternates:{canonical:'/'}, robots:{index:true,follow:true}, verification:{google:"SmYJEHm7C-nN1YQSbzeS8rNg_9CUE7L_m3vqKc-P9-0"}, openGraph:{type:'website',locale:'he_IL',siteName:'מצפן יעלה ויבוא',title:'מצפן יעלה ויבוא | מה עושים עכשיו',description:'הכוונה מהירה ומגובה במקורות לשכחת יעלה ויבוא בתפילת העמידה.',url:'/',images:[{url:shareImage,width:1200,height:630,alt:'מצפן יעלה ויבוא'}]}, twitter:{card:'summary_large_image',images:[shareImage]}, icons:{icon:'/icon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="he" dir="rtl"><body><div className="site-shell"><header className="site-header"><Link href="/" className="brand" aria-label="מצפן יעלה ויבוא – עמוד הבית"><CompassIcon size={43}/><span><strong>מצפן</strong><small>יעלה ויבוא</small></span></Link><nav aria-label="ניווט ראשי"><Link href="/sources">מקורות והבהרות</Link><Link href="/contact">צור קשר</Link></nav></header><main>{children}</main><footer className="site-footer"><span>מצפן יעלה ויבוא · לוח ארץ ישראל</span><div><Link href="/sources">מקורות</Link><Link href="/privacy">פרטיות</Link><Link href="/contact">צור קשר</Link></div></footer></div></body></html>; }
