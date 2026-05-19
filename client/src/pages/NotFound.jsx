import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404" description="Страница не найдена" />
      <section className="section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-brand-accent">404</h1>
        <p className="text-xl text-brand-muted mt-4 mb-8">Страница не найдена</p>
        <Link to="/" className="btn-primary">
          На главную
        </Link>
      </section>
    </>
  );
}
