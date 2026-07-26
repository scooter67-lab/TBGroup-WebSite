import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContactForm from '../components/ui/ContactForm';
import { CardSkeleton } from '../components/ui/Skeleton';
import BrandIcon, { emojiToIcon } from '../components/ui/BrandIcon';
import { serviceContent } from '../data/serviceContent';
import { useSettings } from '../context/SettingsContext';

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
  const content = serviceContent[slug];
  const heroImage = content?.heroImage;
  const { settings } = useSettings();
  const contacts = settings.contacts || {};

  useEffect(() => {
    setLoading(true);
    setService(null);
    api
      .get(`/services/${slug}`)
      .then(({ data }) => setService(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  // fallback рендерится сразу (SSR/SEO + без скелета), данные API перекрывают его
  const shown = service || fallback[slug];

  if (!shown) {
    if (loading) {
      return (
        <div className="section-pad container-tb">
          <CardSkeleton />
        </div>
      );
    }
    return (
      <div className="section-pad container-tb text-center">
        <h1 className="heading-2">Услуга не найдена</h1>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          На главную
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${shown.title} в Казахстане — внедрение и настройка`}
        description={`${shown.shortDescription}. Внедрение, интеграция и поддержка от TB Group — Алматы, работаем по всему Казахстану.`}
        path={`/services/${slug}`}
      />

      {/* Шапка. У услуг с портретом — светлая панель по макету (Figma 13:2
          в IODR8QhwkjHDpz4Ky89qFP), в тёмной теме тот же макет на ink.
          Остальные услуги сохраняют прежнюю ink-панель. */}
      <section
        className={
          heroImage
            ? 'relative overflow-hidden bg-[#F2F7FE] text-tx dark:bg-[#1A1D44] dark:text-tx-inv lg:min-h-[480px]'
            : 'relative overflow-hidden bg-ink text-tx-inv'
        }
      >
        {heroImage && (
          // в тёмном макете фон не ink, а тёмно-синий с градиентом вниз
          <div
            className="absolute inset-0 hidden dark:block pointer-events-none"
            style={{ background: 'linear-gradient(180deg,#1F2352 0%,#1A1D44 100%)' }}
            aria-hidden="true"
          />
        )}
        <div
          className={`absolute inset-0 pointer-events-none ${heroImage ? 'bg-grid-paper dark:bg-grid-ink' : 'bg-grid-ink'}`}
          // в макете сетка идёт по всей площади; у прежней шапки она затухала
          style={
            heroImage
              ? undefined
              : { maskImage: 'radial-gradient(110% 100% at 25% 0%, #000 35%, transparent 75%)', WebkitMaskImage: 'radial-gradient(110% 100% at 25% 0%, #000 35%, transparent 75%)' }
          }
          aria-hidden="true"
        />

        {heroImage && (
          <>
            {/* бледно-голубые круги из макета: замер по референсу — на 16
                единиц темнее фона, то есть почти на грани видимости */}
            <div
              className="absolute rounded-full bg-[#D9E9F8] dark:bg-white/[.035] pointer-events-none max-md:hidden"
              style={{ width: 190, height: 190, left: '58%', top: -62 }}
              aria-hidden="true"
            />
            <div
              className="absolute rounded-full bg-[#DCEAF9] dark:bg-white/[.03] pointer-events-none max-md:hidden"
              style={{ width: 330, height: 330, right: '1%', top: '14%' }}
              aria-hidden="true"
            />
            {/* Фигура упирается в правый край и в низ блока, как в макете.
                Кадр в макете ближе, чем наш кроп по пояс: чтобы голова заняла
                те же ~40% высоты блока, портрет масштабируем крупнее рамки, а
                низ прячем за её границей. */}
            <div
              className="absolute bottom-0 right-[2%] h-[400px] xl:h-[450px] overflow-hidden max-lg:hidden pointer-events-none"
              aria-hidden="true"
            >
              <img src={heroImage} alt="" className="block h-[500px] xl:h-[600px] w-auto" />
            </div>
          </>
        )}

        <div className={`container-tb relative z-10 ${heroImage ? 'py-14 md:py-16 lg:py-20' : 'py-14 md:py-20'}`}>
          {/* правое поле под фигуру, чтобы текст не уходил под неё */}
          <div className={heroImage ? 'lg:max-w-[500px] xl:max-w-[620px]' : ''}>
            <Breadcrumbs items={[{ label: 'Услуги', href: '/#services' }, { label: shown.title }]} />
            <motion.h1
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="heading-1 mb-4"
            >
              {shown.title}
            </motion.h1>
            <p
              className={`text-lg md:text-xl max-w-2xl ${heroImage ? 'text-tx dark:text-tx-inv' : 'text-tx-inv2'}`}
            >
              {shown.shortDescription}
            </p>
            {content?.intro && (
              <p
                className={
                  heroImage
                    ? 'mt-6 text-[15px] md:text-base text-tx2 dark:text-tx-inv2'
                    : 'mt-6 text-[15px] md:text-base text-tx-inv3 max-w-3xl text-justify [hyphens:auto]'
                }
              >
                {content.intro}
              </p>
            )}
          </div>
        </div>
      </section>

      {content?.advantages?.length > 0 ? (
        <section className="section-pad bg-paper-2 dark:bg-ink-2">
          <div className="container-tb">
            <p className="eyebrow mb-5">Преимущества</p>
            <h2 className="heading-2 mb-8 max-w-3xl">{content.advantagesTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.advantages.map((adv) => (
                <div key={adv} className="flex gap-3 items-start card-tb p-4">
                  <BrandIcon name="check" size={24} strokeWidth={1.8} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section-pad bg-paper-2 dark:bg-ink-2">
          <div className="container-tb">
            <p className="eyebrow mb-5">Преимущества</p>
            <h2 className="heading-2 mb-8">Что вы получите</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(shown.benefits || []).map((b, i) => (
                <div key={b.title} className="card-tb p-6">
                  <span className="font-tech text-[12px] text-tx3 dark:text-tx-inv3">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card-title mt-4 mb-2">{b.title}</h3>
                  <p className="text-body-sm">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content && (
        <section className="section-pad">
          <div className="container-tb">
            <p className="eyebrow mb-5">Платформа</p>
            <h2 className="heading-2 mb-8">Возможности платформы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.capabilities.map((cap) => (
                <div key={cap.title} className="card-tb p-6 flex flex-col">
                  <BrandIcon name={emojiToIcon[cap.icon] || 'gear'} size={32} strokeWidth={1.7} className="mb-4" />
                  <h3 className="card-title mb-3">{cap.title}</h3>
                  <ul className="space-y-2">
                    {cap.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm">
                        <span className="w-1.5 h-1.5 rounded-[2px] bg-g1 flex-shrink-0 mt-[7px]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {content.outro && (
              <p className="text-[15px] md:text-base text-tx2 dark:text-tx-inv2 max-w-3xl mt-12">
                {content.outro}
              </p>
            )}
          </div>
        </section>
      )}

      {shown.steps?.length > 0 && (
        <section className="section-pad bg-paper-2 dark:bg-ink-2">
          <div className="container-tb">
            <p className="eyebrow mb-5">Процесс</p>
            <h2 className="heading-2 mb-8">Этапы внедрения</h2>
            <div className="relative max-w-2xl">
              <span className="absolute left-[19px] top-2 bottom-2 w-px bg-g2 opacity-40" aria-hidden="true" />
              <div className="space-y-6">
                {shown.steps.map((step, i) => (
                  <div key={step.title} className="relative flex gap-6 pl-0">
                    <span className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-g1 text-white flex items-center justify-center font-tech text-[13px]">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="card-title">{step.title}</h3>
                      <p className="text-body-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {shown.faq?.length > 0 && (
        <section className="section-pad">
          <div className="container-tb max-w-3xl">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="heading-2 mb-8">Частые вопросы</h2>
            <div className="space-y-3">
              {shown.faq.map((item) => (
                <details key={item.question} className="card-tb !overflow-visible p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="w-6 h-6 flex-none rounded-lg border-[1.5px] border-paper-line2 dark:border-white/15 relative transition-transform duration-250 ease-brand group-open:rotate-45" aria-hidden="true">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-[1.5px] bg-tx2 dark:bg-tx-inv2" />
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-[1.5px] bg-tx2 dark:bg-tx-inv2" />
                    </span>
                  </summary>
                  <p className="mt-3 text-tx2 dark:text-tx-inv2 text-[15px]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-paper-2 dark:bg-ink-2">
        <div className="container-tb grid lg:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow mb-5">Заявка</p>
            <h2 className="heading-2 mb-3">Оставить заявку</h2>
            <p className="text-tx2 dark:text-tx-inv2 mb-7">Оставьте контакты — перезвоним и обсудим задачу</p>
            <ContactForm service={shown.title} />
          </div>
          <div className="space-y-6">
            <div className="card-tb p-6 space-y-5">
              <h3 className="card-title">Контакты</h3>
              {contacts.phone && (
                <div>
                  <p className="label-tech mb-1">Телефон</p>
                  <a href={`tel:${contacts.phone}`} className="text-lg font-semibold hover:text-brand-magenta transition-colors duration-250">
                    {contacts.phone}
                  </a>
                </div>
              )}
              {contacts.email && (
                <div>
                  <p className="label-tech mb-1">Email</p>
                  <a href={`mailto:${contacts.email}`} className="text-lg font-semibold hover:text-brand-magenta transition-colors duration-250 break-all">
                    {contacts.email}
                  </a>
                </div>
              )}
              {contacts.address && (
                <div>
                  <p className="label-tech mb-1">Адрес</p>
                  <p className="text-base">{contacts.address}</p>
                </div>
              )}
              {(contacts.telegram || contacts.whatsapp) && (
                <div className="flex gap-3 pt-1">
                  {contacts.telegram && (
                    <a href={contacts.telegram} target="_blank" rel="noreferrer" className="btn-secondary btn-sm">
                      Telegram
                    </a>
                  )}
                  {contacts.whatsapp && (
                    <a href={contacts.whatsapp} target="_blank" rel="noreferrer" className="btn-primary btn-sm">
                      WhatsApp
                    </a>
                  )}
                </div>
              )}
            </div>
            {shown.gallery?.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {shown.gallery.map((img, i) => (
                  <img key={i} src={img} alt="" className="rounded-xl object-cover h-40 w-full" loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
