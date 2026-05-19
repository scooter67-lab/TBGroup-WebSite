import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const team = [
  { name: 'Андрей Смирнов', role: 'CEO, архитектор решений' },
  { name: 'Елена Волкова', role: 'Руководитель внедрения Битрикс24' },
  { name: 'Игорь Кузнецов', role: 'Эксперт МойСклад' },
  { name: 'Ольга Морозова', role: 'Интеграции и телефония' },
];

const partners = ['МойСклад', 'Битрикс24', 'Манго', 'UIS', 'Roistat'];

export default function About() {
  return (
    <>
      <SEO title="О компании" description="История, команда и партнёры TB Group" path="/about" />
      <section className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          <h1 className="heading-1 mb-8">О компании</h1>

          <section className="mb-16 max-w-3xl">
            <h2 className="heading-2 mb-4">История</h2>
            <p className="text-brand-muted leading-relaxed">
              TB Group работает с 2017 года. Начинали с внедрения МойСклад для торговых компаний,
              выросли в полноценного интегратора облачных решений с фокусом на автоматизацию продаж,
              склада и коммуникаций.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="heading-2 mb-8 text-center">Команда</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-accent/20 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-brand-accent">
                    {m.name[0]}
                  </div>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="text-sm text-brand-muted mt-1">{m.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="heading-2 mb-6">Сертификаты и партнёры</h2>
            <div className="flex flex-wrap gap-4">
              {partners.map((p) => (
                <span key={p} className="px-6 py-3 glass rounded-xl font-medium">
                  {p}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="heading-2 mb-6">Офис</h2>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-navy to-brand-accent/30 flex items-center justify-center text-white/60">
              Фото офиса
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
