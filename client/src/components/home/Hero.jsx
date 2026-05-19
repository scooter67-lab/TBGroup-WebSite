import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

export default function Hero() {
  const { settings } = useSettings();
  const stats = settings.stats || { projects: 150, clients: 80, years: 8, integrations: 300 };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-accent/40 via-transparent to-brand-navy animate-gradient-x"
          style={{ backgroundSize: '200% 200%' }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative z-10 section-padding w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-brand-accent mb-6">
            Облачные решения для бизнеса
          </span>
          <h1 className="heading-1 mb-6">
            Внедряем <span className="text-brand-accent">МойСклад</span>,{' '}
            <span className="text-brand-accent">Битрикс24</span> и телефонию
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            TB Group — интеграция облачных систем, автоматизация процессов и CRM. От аудита до
            сопровождения.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contacts" className="btn-primary">
              Бесплатная консультация
            </Link>
            <Link to="/cases" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
              Смотреть кейсы
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl"
        >
          {[
            { value: `${stats.projects}+`, label: 'Проектов' },
            { value: `${stats.clients}+`, label: 'Клиентов' },
            { value: `${stats.years}`, label: 'Лет на рынке' },
            { value: `${stats.integrations}+`, label: 'Интеграций' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-accent">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
