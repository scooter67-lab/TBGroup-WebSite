import { motion } from 'framer-motion';
import { Section } from './Section';

const benefits = [
  { title: 'Опыт 8+ лет', desc: 'Сотни внедрений в торговле, производстве и услугах' },
  { title: 'Комплексный подход', desc: 'От аудита до поддержки и обучения персонала' },
  { title: 'Сертифицированные партнёры', desc: 'Официальные интеграторы МойСклад и Битрикс24' },
  { title: 'Прозрачные сроки', desc: 'Фиксированные этапы и отчётность по проекту' },
];

export default function Benefits() {
  return (
    <Section subtitle="Преимущества" title="Почему выбирают TB Group">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-brand-navy-light rounded-2xl p-6 shadow-soft"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center font-bold mb-4">
              {i + 1}
            </div>
            <h3 className="font-bold mb-2">{b.title}</h3>
            <p className="text-sm text-brand-muted dark:text-gray-400">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
