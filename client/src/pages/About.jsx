import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';

export default function About() {
  const { pages } = useSettings();
  const block = pages.about || {};

  return (
    <>
      <SEO title="О компании" description="История, команда и партнёры TB Group" path="/about" />
      <section className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          <h1 className="heading-1 mb-8">{block.pageTitle || 'О компании'}</h1>

          <section className="mb-16 max-w-3xl">
            <h2 className="heading-2 mb-4">{block.history?.title}</h2>
            <p className="text-brand-muted leading-relaxed">{block.history?.text}</p>
          </section>

          <section className="mb-16">
            <h2 className="heading-2 mb-8 text-center">{block.team?.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(block.team?.members || []).map((m, i) => (
                <motion.div
                  key={`${m.name}-${i}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-accent/20 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-brand-accent">
                    {m.name?.[0]}
                  </div>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="text-sm text-brand-muted mt-1">{m.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="heading-2 mb-6">{block.partners?.title}</h2>
            <div className="flex flex-wrap gap-4">
              {(block.partners?.items || []).map((p) => (
                <span key={p} className="px-6 py-3 glass rounded-xl font-medium">
                  {p}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="heading-2 mb-6">{block.office?.title}</h2>
            {block.office?.image ? (
              <img src={block.office.image} alt={block.office.title} className="w-full aspect-video object-cover rounded-2xl" />
            ) : (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-navy to-brand-accent/30 flex items-center justify-center text-white/60">
                {block.office?.placeholder || 'Фото офиса'}
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
