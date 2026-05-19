import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { Section } from './Section';
import { CardSkeleton } from '../ui/Skeleton';

export default function CasesPreview() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/cases?featured=true')
      .then(({ data }) => setCases(data.slice(0, 3)))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section id="cases" subtitle="Кейсы" title="Результаты наших проектов" dark>
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <CardSkeleton key={n} />
          ))}
        </div>
      ) : (
        <motion.div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/cases/${c.slug}`}
                className="block glass rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform"
              >
                <span className="text-xs text-brand-accent font-medium">{c.industry}</span>
                <h3 className="text-lg font-bold mt-2 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{c.result}</p>
                {c.metrics?.[0] && (
                  <p className="mt-4 text-brand-accent font-bold text-2xl">{c.metrics[0].value}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="text-center mt-10">
        <Link to="/cases" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
          Все кейсы
        </Link>
      </div>
    </Section>
  );
}
