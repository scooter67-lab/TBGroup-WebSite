import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';
import BrandIcon from '../ui/BrandIcon';

const icons = ['rocket', 'nodes', 'shield', 'doc'];

export default function Benefits() {
  const { pages } = useSettings();
  const block = pages.home?.benefits;
  const items = block?.items || [];

  return (
    <Section subtitle={block?.subtitle} title={block?.title}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((b, i) => (
          <motion.div
            key={`${b.title}-${i}`}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="card-tb p-6"
          >
            <BrandIcon name={icons[i % icons.length]} size={34} strokeWidth={1.7} className="mb-4" />
            <h3 className="font-bold mb-1.5">{b.title}</h3>
            <p className="text-sm text-tx2 dark:text-tx-inv2">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
