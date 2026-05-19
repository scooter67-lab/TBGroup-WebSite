import { motion } from 'framer-motion';

export function Section({ id, title, subtitle, children, className = '', dark = false }) {
  return (
    <section
      id={id}
      className={`section-padding ${dark ? 'bg-brand-navy text-white' : 'bg-brand-gray dark:bg-brand-navy/50'} ${className}`}
    >
      <div className="container-narrow">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            {subtitle && (
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="heading-2">{title}</h2>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
