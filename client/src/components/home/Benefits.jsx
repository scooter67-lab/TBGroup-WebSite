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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((b, i) => (
          <motion.div
            key={`${b.title}-${i}`}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="card-tb p-6"
          >
            <BrandIcon name={icons[i % icons.length]} size={32} strokeWidth={1.7} className="mb-4" />
            <h3 className="card-title mb-2">{b.title}</h3>
            <p className="text-body-sm">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
