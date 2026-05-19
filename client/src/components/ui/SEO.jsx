import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '', image }) {
  const siteName = 'TB Group';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — облачные решения, МойСклад, Битрикс24`;
  const desc =
    description ||
    'Внедрение и интеграция облачных решений: МойСклад, Битрикс24, IP-телефония и CRM.';
  const url = `https://tbgroup.ru${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
