import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
// Страницы импортируются статично (не React.lazy): сайт пререндерится в
// статический HTML (SSG), и клиент монтируется через createRoot (не
// hydrate) — значит на старте JS Suspense-фолбэк на секунду перекрывал бы
// уже показанный пререндеренный контент полноэкранным спиннером, пока грузится
// чанк страницы. Суммарный вес всех страниц — единицы КБ гзипом, экономия
// от code-splitting не стоит этой вспышки.
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:slug" element={<CaseDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
