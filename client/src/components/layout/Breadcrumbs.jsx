import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="text-[13px] text-tx3 dark:text-tx-inv3 mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="text-tx2 dark:text-tx-inv2 hover:text-tx dark:hover:text-tx-inv transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link to={item.href} className="text-tx2 dark:text-tx-inv2 hover:text-tx dark:hover:text-tx-inv transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-tx dark:text-tx-inv">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
