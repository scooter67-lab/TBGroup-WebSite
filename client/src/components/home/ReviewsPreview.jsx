import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';

/** Рейтинг дизайн-системы: пиксели-квадраты с градиентом вместо жёлтых звёзд */
export function Rating({ value = 5, className = '' }) {
  return (
    <div className={`flex gap-1.5 ${className}`} aria-label={`Оценка ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-2.5 h-2.5 rounded-[3px] ${n <= value ? 'bg-g1' : 'bg-paper-line2 dark:bg-white/15'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPreview() {
  const { pages } = useSettings();
  const block = pages.home?.reviews;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/reviews').then(({ data }) => setReviews(data.slice(0, 3))).catch(() => {});
  }, []);

  if (reviews.length === 0) return null; // пустую секцию на главной не показываем

  return (
    <Section id="reviews" subtitle={block?.subtitle} title={block?.title} tone="alt">
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="card-tb p-6"
          >
            <Rating value={r.rating || 5} className="mb-4" />
            <p className="text-[15px] text-tx2 dark:text-tx-inv2 mb-5">&ldquo;{r.text}&rdquo;</p>
            <p className="font-semibold text-sm">{r.author}</p>
            {r.company && <p className="text-[13px] text-tx3 dark:text-tx-inv3">{r.company}</p>}
          </motion.div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/reviews" className="btn-ghost">
          {block?.ctaLabel || 'Все отзывы'} →
        </Link>
      </div>
    </Section>
  );
}
