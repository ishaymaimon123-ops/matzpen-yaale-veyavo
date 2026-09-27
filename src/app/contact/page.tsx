import type { Metadata } from 'next'; import Link from 'next/link'; import { ContactForm } from './ContactForm';
export const metadata:Metadata={title:'צור קשר',description:'שלחו שאלה, תיקון או משוב לצוות מצפן יעלה ויבוא.',alternates:{canonical:'/contact'}};
export default function Page(){return <section className="content-page"><div className="breadcrumbs"><Link href="/">בית</Link> / צור קשר</div><span className="eyebrow">נשמח לשמוע</span><h1>צור קשר</h1><p>מצאת טעות או יש לך הצעה לשיפור? אפשר לשלוח לנו הודעה כאן.</p><ContactForm/></section>}
