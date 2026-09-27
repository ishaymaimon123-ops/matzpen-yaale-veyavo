import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://matzpen-yaale-veyavo.vercel.app';return ['/','/rosh-chodesh','/chol-hamoed','/yom-tov','/sources','/contact','/privacy'].map(path=>({url:`${base}${path}`,changeFrequency:'monthly',priority:path==='/'?1:.6}))}
