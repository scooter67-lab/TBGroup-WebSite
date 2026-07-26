import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';
import BrandIcon, { emojiToIcon } from '../ui/BrandIcon';

const fallbackServices = [
  { _id: 'f1', slug: 'moysklad', title: 'МойСклад', icon: 'package', shortDescription: 'Учёт склада и продаж, синхронизация с CRM и маркетплейсами, автоматизация рутины.' },
  { _id: 'f2', slug: 'bitrix24', title: 'Битрикс24', icon: 'users', shortDescription: 'CRM, воронки продаж, автоматизация бизнес-процессов и корпоративный портал.' },
  { _id: 'f3', slug: 'telephony', title: 'Телефония', icon: 'phone', shortDescription: 'IP-АТС, SIP-номера, запись звонков и интеграция телефонии с CRM.' },
];

export default function ServicesGrid() {
  const { pages } = useSettings();
  const block = pages.home?.services;
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    api
      .get('/services')
      .then(({ data }) => {
        if (data?.length) setServices(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <Section id="services" subtitle={block?.subtitle} title={block?.title} tone="alt">
      {block?.intro && <p className="text-body max-w-3xl -mt-6 mb-10">{block.intro}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Link to={`/services/${s.slug}`} className="card-tb card-tb-hover flex flex-col gap-3 p-8 h-full group">
              <BrandIcon name={emojiToIcon[s.icon] || 'cloud'} size={40} strokeWidth={1.6} />
              <h3 className="card-title mt-2">{s.title}</h3>
              <p className="text-body-sm">{s.shortDescription}</p>
              <span className="mt-auto pt-2 font-semibold text-sm bg-g1 bg-clip-text text-transparent">
                Подробнее →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {block?.abilities?.length > 0 && (
        <div className="mt-16">
          {block.offer && (
            <div className="card-tb p-6 md:p-7 mb-10 flex gap-5 items-start">
              <span className="w-1 self-stretch rounded-full bg-g1 flex-none" aria-hidden="true" />
              <div>
                <h3 className="card-title">{block.offer.title}</h3>
                {block.offer.desc && <p className="text-body-sm mt-1">{block.offer.desc}</p>}
              </div>
            </div>
          )}

          {block.abilitiesTitle && (
            <p className="text-body font-semibold mb-6">{block.abilitiesTitle}</p>
          )}
          {/* именно columns, а не grid: в гриде строки выравниваются по самому
              высокому пункту и между короткими появляются рваные зазоры */}
          <ul className="sm:columns-2 sm:gap-x-10 space-y-3">
            {block.abilities.map((item) => (
              <li key={item} className="flex gap-3 text-body-sm break-inside-avoid">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-g1 flex-shrink-0 mt-[9px]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
