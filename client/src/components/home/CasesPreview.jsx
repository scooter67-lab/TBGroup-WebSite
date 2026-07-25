import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';
import { CardSkeleton } from '../ui/Skeleton';

export default function CasesPreview() {
  const { pages } = useSettings();
  const block = pages.home?.cases;
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/cases?featured=true')
      .then(({ data }) => setCases(data.slice(0, 3)))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && cases.length === 0) return null; // не показываем пустую секцию

  return (
    <Section id="cases" subtitle={block?.subtitle} title={block?.title} tone="ink">
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <CardSkeleton key={n} />
          ))}
        </div>
      ) : (
        <div className={`grid gap-6 ${cases.length === 1 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {cases.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 1, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Link
                to={`/cases/${c.slug}`}
                className="card-tb card-tb-hover !bg-ink-4 !border-white/10 hover:!border-white/20 block p-8 h-full"
              >
                <span className="font-tech text-[10px] tracking-[.15em] uppercase text-tx-inv3">
                  {c.client}{c.industry ? ` · ${c.industry}` : ''}
                </span>
                <h3 className="card-title mt-4 mb-2 text-tx-inv">{c.title}</h3>
                <p className="text-sm text-tx-inv2 line-clamp-2">{c.result}</p>
                {c.metrics?.[0] && (
                  <p className="mt-5 font-tech text-2xl bg-g1 bg-clip-text text-transparent">
                    {c.metrics[0].value}
                  </p>
                )}
                {c.metrics?.[0] && (
                  <p className="text-xs text-tx-inv3 mt-1">{c.metrics[0].label}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      <div className="mt-10">
        <Link to="/cases" className="btn-secondary !border-white/15 !text-tx-inv hover:!border-brand-magenta">
          {block?.ctaLabel || 'Все кейсы'} →
        </Link>
      </div>
    </Section>
  );
}
