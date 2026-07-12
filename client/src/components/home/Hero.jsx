import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { OrbitalScene } from '../ui/Decor';

const defaults = {
  badge: 'TB Group · Казахстан',
  title: (
    <>
      Системы, которые{' '}
      <em className="not-italic bg-g1 bg-clip-text text-transparent">работают на ваш рост</em>
    </>
  ),
  subtitle:
    'Внедряем МойСклад, Битрикс24 и IP-телефонию: связываем склад, продажи и коммуникации в один управляемый контур.',
  ctaPrimary: { to: '/contacts', label: 'Бесплатная консультация' },
  ctaSecondary: { to: '/cases', label: 'Смотреть кейсы' },
};

function BannerLink({ href, className, children }) {
  const external = href.startsWith('http');
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

/** Счётчик: целые значения, 1.2s, один раз при появлении (спека движения) */
function Counter({ to }) {
  const ref = useRef(null);
  // старт с финального значения: цифры видны даже если observer не сработал
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        let t0 = null;
        const step = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1200, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{val}</span>;
}

export default function Hero() {
  const { settings, pages, getBanner, loading } = useSettings();
  const banner = getBanner('hero');
  const heroBlock = pages.home?.hero;
  const stats = settings.stats || { projects: 150, clients: 80, years: 8, integrations: 300 };

  const title = banner?.title ? <span>{banner.title}</span> : defaults.title;
  const subtitle = banner?.subtitle || defaults.subtitle;
  const primary = banner?.link ? { to: banner.link, label: 'Подробнее' } : defaults.ctaPrimary;
  const secondary = {
    to: heroBlock?.ctaSecondaryLink || defaults.ctaSecondary.to,
    label: heroBlock?.ctaSecondaryLabel || defaults.ctaSecondary.label,
  };
  const badge = heroBlock?.badge || defaults.badge;

  return (
    <section className="relative overflow-hidden bg-ink text-tx-inv">
      {/* цифровая сетка с затуханием */}
      <div
        className="absolute inset-0 bg-grid-ink pointer-events-none"
        style={{ maskImage: 'radial-gradient(120% 90% at 30% 20%, #000 40%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 90% at 30% 20%, #000 40%, transparent 78%)' }}
        aria-hidden="true"
      />
      {banner?.image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${banner.image})` }}
          aria-hidden="true"
        />
      )}
      {/* инженерная орбитальная сцена — выходит за края экрана */}
      <div
        className="absolute pointer-events-none max-md:opacity-30 max-md:-right-56 max-md:-bottom-44 max-md:top-auto md:-top-36 md:-right-40 lg:-right-24 xl:right-0"
        style={{ width: 780, height: 680 }}
        aria-hidden="true"
      >
        <OrbitalScene className="w-full h-full" />
      </div>
      <div className="container-tb relative z-10">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-2xl py-20 md:py-28 xl:py-32"
        >
          {!loading && (
            <p className="font-tech text-[10px] tracking-[.22em] uppercase text-tx-inv2 flex items-center gap-3 mb-6">
              <span className="w-7 h-0.5 bg-g1 rounded-full flex-none" aria-hidden="true" />
              {badge}
            </p>
          )}
          <h1 className="font-display font-semibold text-[32px] leading-[1.1] md:text-[46px] lg:text-[52px] md:leading-[1.08] mb-5">
            {title}
          </h1>
          <p className="text-base md:text-lg text-tx-inv2 mb-8 max-w-xl">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <BannerLink href={primary.to} className="btn-primary">
              {primary.label}
            </BannerLink>
            <BannerLink href={secondary.to} className="btn-secondary !border-white/15 !text-tx-inv hover:!border-brand-magenta">
              {secondary.label}
            </BannerLink>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-9">
            <span className="font-tech text-[8.5px] tracking-[.16em] uppercase text-tx-inv2 border border-white/10 rounded-lg px-3 py-2">Moysklad · Partner</span>
            <span className="font-tech text-[8.5px] tracking-[.16em] uppercase text-tx-inv2 border border-white/10 rounded-lg px-3 py-2">Bitrix24 · Partner</span>
            <span className="font-tech text-[8.5px] tracking-[.16em] uppercase text-tx-inv2 border border-white/10 rounded-lg px-3 py-2">Since 2017 · KZ</span>
          </div>
        </motion.div>
      </div>

      {/* статистика: Michroma-цифры со счётчиками */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-tb grid grid-cols-2 md:grid-cols-4">
          {[
            { value: stats.projects, suffix: '+', label: 'проектов' },
            { value: stats.clients, suffix: '+', label: 'клиентов' },
            { value: stats.years, suffix: '', label: 'лет на рынке' },
            { value: stats.integrations, suffix: '+', label: 'интеграций' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`py-5 md:py-6 px-4 md:px-8 border-white/10 ${i > 0 ? 'md:border-l' : ''} ${i % 2 === 1 ? 'border-l md:border-l' : ''}`}
            >
              <div className="font-tech text-xl md:text-[26px] tabular-nums">
                <Counter to={s.value} />
                {s.suffix}
              </div>
              <div className="text-[12.5px] text-tx-inv2 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
