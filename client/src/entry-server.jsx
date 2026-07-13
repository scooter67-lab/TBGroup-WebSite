/**
 * SSR-вход для пререндера (SSG). Выполняется только в Node на этапе сборки:
 * `vite build --ssr` + prerender.mjs. В браузер этот код не попадает.
 */
import { StrictMode } from 'react';
import { prerender as reactPrerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';

export async function render(url) {
  const helmetContext = {};

  const { prelude } = await reactPrerender(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <ThemeProvider>
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </ThemeProvider>
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const html = await new Response(prelude).text();
  return { html, helmet: helmetContext.helmet };
}
