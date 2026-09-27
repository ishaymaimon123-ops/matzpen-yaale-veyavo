const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://matzpen-yaale-veyavo.vercel.app';

export function BreadcrumbJsonLd({ path, title }: { path: string; title: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: base },
      { '@type': 'ListItem', position: 2, name: title, item: new URL(path, base).toString() },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
