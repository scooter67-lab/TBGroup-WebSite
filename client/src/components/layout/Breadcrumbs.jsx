import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="text-sm text-brand-muted mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-brand-accent transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link to={item.href} className="hover:text-brand-accent transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-navy dark:text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
