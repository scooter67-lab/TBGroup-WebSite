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
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Link to={`/services/${s.slug}`} className="card-tb card-tb-hover flex flex-col gap-3 p-7 h-full group">
              <BrandIcon name={emojiToIcon[s.icon] || 'cloud'} size={42} strokeWidth={1.6} />
              <h3 className="text-lg font-bold mt-1">{s.title}</h3>
              <p className="text-sm text-tx2 dark:text-tx-inv2">{s.shortDescription}</p>
              <span className="mt-auto pt-2 font-semibold text-sm bg-g1 bg-clip-text text-transparent">
                Подробнее →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
