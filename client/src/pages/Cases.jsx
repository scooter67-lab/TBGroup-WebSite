import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Pagination from '../components/ui/Pagination';
import { CardSkeleton } from '../components/ui/Skeleton';

const PER_PAGE = 9;

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [service, setService] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (service) params.set('service', service);
    api
      .get(`/cases?${params}`)
      .then(({ data }) => setCases(data))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, [search, service]);

  const totalPages = Math.ceil(cases.length / PER_PAGE) || 1;
  const paginated = cases.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <SEO title="Кейсы" description="Проекты внедрения МойСклад, Битрикс24 и телефонии" path="/cases" />
      <section className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: 'Кейсы' }]} />
          <h1 className="heading-1 mb-8">Кейсы</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="search"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-4 py-3 rounded-xl border dark:bg-brand-navy-light dark:border-brand-navy-light outline-none focus:ring-2 focus:ring-brand-accent"
            />
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 rounded-xl border dark:bg-brand-navy-light dark:border-brand-navy-light"
            >
              <option value="">Все услуги</option>
              <option value="moysklad">МойСклад</option>
              <option value="bitrix24">Битрикс24</option>
              <option value="telephony">Телефония</option>
            </select>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <CardSkeleton key={n} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {paginated.map((c, i) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/cases/${c.slug}`}
                      className="block glass rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform"
                    >
                      <span className="text-xs text-brand-accent">{c.client}</span>
                      <h2 className="text-lg font-bold mt-2 mb-2">{c.title}</h2>
                      <p className="text-sm text-brand-muted line-clamp-2">{c.task}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
