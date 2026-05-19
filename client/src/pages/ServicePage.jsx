import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContactForm from '../components/ui/ContactForm';
import { CardSkeleton } from '../components/ui/Skeleton';

const fallback = {
  moysklad: {
    title: 'МойСклад',
    shortDescription: 'Внедрение, интеграции, CRM-синхронизация и автоматизация',
    benefits: [
      { title: 'Внедрение', description: 'Полная настройка под ваш бизнес' },
      { title: 'Интеграции', description: 'Битрикс24, маркетплейсы, 1С' },
      { title: 'CRM синхронизация', description: 'Единая база клиентов и заказов' },
      { title: 'Автоматизация', description: 'Роботы и триггеры для склада' },
    ],
  },
  bitrix24: {
    title: 'Битрикс24',
    shortDescription: 'CRM, автоматизация, телефония и интеграции',
    benefits: [
      { title: 'CRM', description: 'Управление лидами и сделками' },
      { title: 'Автоматизация', description: 'Бизнес-процессы и роботы' },
      { title: 'Телефония', description: 'SIP и запись звонков' },
      { title: 'Воронки', description: 'Настройка продаж и аналитики' },
    ],
  },
  telephony: {
    title: 'Телефония',
    shortDescription: 'SIP, IP-АТС, CRM и call tracking',
    benefits: [
      { title: 'SIP', description: 'Подключение номеров' },
      { title: 'IP-АТС', description: 'IVR, очереди, маршрутизация' },
      { title: 'CRM', description: 'Интеграция с Битрикс24' },
      { title: 'Call tracking', description: 'Аналитика источников' },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/services/${slug}`)
      .then(({ data }) => setService(data))
      .catch(() => setService(fallback[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="section-padding container-narrow">
        <CardSkeleton />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="section-padding container-narrow text-center">
        <h1 className="heading-2">Услуга не найдена</h1>
        <Link to="/" className="btn-primary mt-4 inline-flex">
          На главную
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={service.title} description={service.shortDescription} path={`/services/${slug}`} />
      <section className="bg-brand-navy text-white section-padding">
        <motion.div className="container-narrow">
          <Breadcrumbs items={[{ label: 'Услуги', href: '/#services' }, { label: service.title }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 mb-4"
          >
            {service.title}
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl">{service.shortDescription}</p>
        </motion.div>
      </section>

      <section className="section-padding bg-brand-gray dark:bg-brand-navy/50">
        <div className="container-narrow">
          <h2 className="heading-2 mb-8 text-center">Преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(service.benefits || []).map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-brand-navy-light rounded-2xl p-6 shadow-soft"
              >
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-brand-muted">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {(service.steps?.length > 0) && (
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="heading-2 mb-8 text-center">Этапы внедрения</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {service.steps.map((step, i) => (
                <div key={step.title} className="flex gap-4 glass rounded-xl p-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-brand-muted text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(service.faq?.length > 0) && (
        <section className="section-padding bg-brand-gray dark:bg-brand-navy/50">
          <motion.div className="container-narrow max-w-3xl">
            <h2 className="heading-2 mb-8 text-center">FAQ</h2>
            <div className="space-y-4">
              {service.faq.map((item) => (
                <details key={item.question} className="glass rounded-xl p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between">
                    {item.question}
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-brand-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-narrow grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="heading-2 mb-4">Оставить заявку</h2>
            <p className="text-brand-muted mb-6">Расскажите о задаче — подготовим предложение</p>
            <ContactForm service={service.title} />
          </div>
          {service.gallery?.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {service.gallery.map((img, i) => (
                <img key={i} src={img} alt="" className="rounded-xl object-cover h-40 w-full" loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
