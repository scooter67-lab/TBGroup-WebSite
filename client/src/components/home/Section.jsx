import { motion } from 'framer-motion';

/**
 * Секция дизайн-системы: эйбра Michroma с градиентным тиком, заголовок Unbounded слева.
 * tone: 'default' | 'alt' (чередование фона) | 'ink' (тёмная панель-секция)
 */
export function Section({ id, title, subtitle, children, className = '', tone = 'default', dark = false }) {
  const t = dark ? 'ink' : tone;
  const bg =
    t === 'ink'
      ? 'bg-ink text-tx-inv'
      : t === 'alt'
        ? 'bg-paper-2 dark:bg-ink-2'
        : 'bg-paper dark:bg-ink';

  return (
    <section id={id} className={`section-pad ${bg} ${className}`}>
      <div className="container-tb">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-10 md:mb-14"
          >
            {subtitle && <p className={`eyebrow mb-4 ${t === 'ink' ? '!text-tx-inv3' : ''}`}>{subtitle}</p>}
            {title && <h2 className="heading-2">{title}</h2>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
