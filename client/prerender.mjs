/**
 * SSG-пререндер: генерирует статические HTML для фиксированных маршрутов,
 * чтобы поисковые боты получали контент и мету без выполнения JS.
 * Запуск: node prerender.mjs (после `vite build` и `vite build --ssr`).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const { render } = await import('./dist-ssr/entry-server.js');

const routes = [
  '/',
  '/services/moysklad',
  '/services/bitrix24',
  '/services/telephony',
  '/cases',
  '/reviews',
  '/about',
  '/contacts',
];

const template = readFileSync(join(root, 'dist/index.html'), 'utf-8');

for (const route of routes) {
  const { html, helmet } = await render(route);

  let page = template;
  // страничные title/meta из Helmet вместо статических
  if (helmet) {
    page = page
      .replace(/<title>[^<]*<\/title>/, '')
      .replace(/<meta name="description"[^>]*\/>\s*/, '');
    const head = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()]
      .filter(Boolean)
      .join('\n    ');
    page = page.replace('</head>', `  ${head}\n  </head>`);
  }
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outFile = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  mkdirSync(dirname(join(root, outFile)), { recursive: true });
  writeFileSync(join(root, outFile), page);
  console.log(`prerendered ${route} -> ${outFile} (${(page.length / 1024).toFixed(0)} KB)`);
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('SSG done:', routes.length, 'routes');
