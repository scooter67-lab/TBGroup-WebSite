import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';

const iconMap = {
  package: '📦',
  users: '👥',
  phone: '📞',
  cloud: '☁️',
};

export default function ServicesGrid() {
  const { pages } = useSettings();
  const block = pages.home?.services;
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .get('/services')
      .then(({ data }) => setServices(data.slice(0, 3)))
      .catch(() => setServices([]));
  }, []);

  return (
    <Section id="services" subtitle={block?.subtitle} title={block?.title}>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/services/${s.slug}`}
              className="block glass rounded-2xl p-8 h-full hover:shadow-glass hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-4xl mb-4 block">{iconMap[s.icon] || '☁️'}</span>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{s.title}</h3>
              <p className="text-brand-muted dark:text-gray-400">{s.shortDescription}</p>
              <span className="inline-block mt-4 text-brand-accent font-medium">Подробнее →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
