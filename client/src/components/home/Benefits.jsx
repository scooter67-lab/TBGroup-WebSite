import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';

export default function Benefits() {
  const { pages } = useSettings();
  const block = pages.home?.benefits;
  const items = block?.items || [];

  return (
    <Section subtitle={block?.subtitle} title={block?.title}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((b, i) => (
          <motion.div
            key={`${b.title}-${i}`}
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
