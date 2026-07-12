import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Pagination from '../components/ui/Pagination';
import { CardSkeleton } from '../components/ui/Skeleton';
import { PixelCluster } from '../components/ui/Decor';

const PER_PAGE = 9;
const FILTERS_FROM = 6; // фильтры и поиск — только когда есть из чего выбирать

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [allCount, setAllCount] = useState(0);
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
      .then(({ data }) => {
        setCases(data);
        if (!search && !service) setAllCount(data.length);
      })
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, [search, service]);

  const totalPages = Math.ceil(cases.length / PER_PAGE) || 1;
  const paginated = cases.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const showFilters = allCount >= FILTERS_FROM;

  return (
    <>
      <SEO title="Кейсы" description="Проекты внедрения МойСклад, Битрикс24 и телефонии" path="/cases" />
      <section className="section-pad">
        <div className="container-tb">
          <Breadcrumbs items={[{ label: 'Кейсы' }]} />
          <p className="eyebrow mb-4">Результаты</p>
          <h1 className="heading-1 mb-10">Кейсы</h1>

          {showFilters && (
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="search"
                placeholder="Поиск по кейсам…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="input-tb flex-1"
              />
              <select
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setPage(1);
                }}
                className="input-tb md:w-56"
              >
                <option value="">Все услуги</option>
                <option value="moysklad">МойСклад</option>
                <option value="bitrix24">Битрикс24</option>
                <option value="telephony">Телефония</option>
              </select>
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <CardSkeleton key={n} />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="max-w-lg mx-auto text-center border-[1.5px] border-dashed border-paper-line2 dark:border-white/15 rounded-2xl px-8 py-14 my-8">
              <PixelCluster size={52} className="mx-auto mb-5" />
              <h2 className="font-bold text-lg mb-2">Кейсы готовятся к публикации</h2>
              <p className="text-sm text-tx2 dark:text-tx-inv2 mb-6">
                Мы описываем завершённые проекты внедрения. А пока — расскажите о своей задаче,
                и мы покажем похожие решения на консультации.
              </p>
              <Link to="/contacts" className="btn-primary">Обсудить задачу</Link>
            </div>
          ) : (
            <>
              <div className={`grid gap-5 ${paginated.length === 1 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {paginated.map((c, i) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 1, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <Link to={`/cases/${c.slug}`} className="card-tb card-tb-hover block p-7 h-full">
                      <span className="font-tech text-[9px] tracking-[.15em] uppercase text-tx3 dark:text-tx-inv3">
                        {c.client}
                      </span>
                      <h2 className="text-lg font-bold mt-3 mb-2">{c.title}</h2>
                      <p className="text-sm text-tx2 dark:text-tx-inv2 line-clamp-2">{c.task}</p>
                      {c.metrics?.[0] && (
                        <p className="mt-5 font-tech text-2xl bg-g1 bg-clip-text text-transparent">
                          {c.metrics[0].value}
                        </p>
                      )}
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
