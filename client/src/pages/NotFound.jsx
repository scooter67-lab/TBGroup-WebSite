import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { PixelCluster } from '../components/ui/Decor';

export default function NotFound() {
  return (
    <>
      <SEO title="404" description="Страница не найдена" noindex />
      <section className="relative overflow-hidden section-pad min-h-[70vh] flex items-center bg-paper bg-grid-paper dark:bg-ink dark:bg-grid-ink">
        <div className="container-tb relative text-center">
          <PixelCluster size={64} className="mx-auto mb-6" />
          <p className="font-tech text-[10px] tracking-[.22em] uppercase text-tx3 dark:text-tx-inv3 mb-4">Signal lost</p>
          <h1 className="font-display font-semibold text-7xl md:text-8xl bg-g1 bg-clip-text text-transparent leading-none">
            404
          </h1>
          <p className="text-lg text-tx2 dark:text-tx-inv2 mt-5 mb-9">Такой страницы нет — но система работает.</p>
          <Link to="/" className="btn-primary">На главную</Link>
        </div>
      </section>
    </>
  );
}
