import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { Section } from './Section';

export default function ReviewsPreview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/reviews').then(({ data }) => setReviews(data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <Section id="reviews" subtitle="Отзывы" title="Нам доверяют">
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex gap-1 mb-3 text-yellow-400">
              {'★'.repeat(r.rating || 5)}
            </div>
            <p className="text-brand-muted dark:text-gray-300 mb-4">&ldquo;{r.text}&rdquo;</p>
            <p className="font-semibold">{r.author}</p>
            <p className="text-sm text-brand-muted">{r.company}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/reviews" className="btn-primary">
          Все отзывы
        </Link>
      </div>
    </Section>
  );
}
