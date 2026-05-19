import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from './Section';

const services = [
  {
    slug: 'moysklad',
    title: 'МойСклад',
    desc: 'Внедрение, интеграции, CRM-синхронизация и автоматизация учёта',
    icon: '📦',
  },
  {
    slug: 'bitrix24',
    title: 'Битрикс24',
    desc: 'CRM, автоматизация, телефония, роботы и воронки продаж',
    icon: '👥',
  },
  {
    slug: 'telephony',
    title: 'Телефония',
    desc: 'SIP, IP-АТС, интеграция с CRM и call tracking',
    icon: '📞',
  },
];

export default function ServicesGrid() {
  return (
    <Section id="services" subtitle="Услуги" title="Чем мы помогаем бизнесу">
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/services/${s.slug}`}
              className="block glass rounded-2xl p-8 h-full hover:shadow-glass hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">
                {s.title}
              </h3>
              <p className="text-brand-muted dark:text-gray-400">{s.desc}</p>
              <span className="inline-block mt-4 text-brand-accent font-medium">Подробнее →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
