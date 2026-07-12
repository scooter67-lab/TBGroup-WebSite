import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://tbgroup.kz';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.png`;

export default function SEO({ title, description, path = '', image, noindex = false }) {
  const siteName = 'TB Group';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — облачные решения, МойСклад, Битрикс24`;
  const desc =
    description ||
    'Внедрение и интеграция облачных решений в Казахстане: МойСклад, Битрикс24, IP-телефония и CRM. Системный подход к вашему успеху.';
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content={image || DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
