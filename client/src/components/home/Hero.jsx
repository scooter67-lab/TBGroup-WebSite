import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { OrbitalScene } from '../ui/Decor';

const defaults = {
  badge: 'Создаём решения для бизнеса',
  title: (
    <>
      <span className="block">Система, которая делает</span>
      <span className="block bg-gradient-to-r from-brand-purple via-[#7C3AED] to-brand-magenta bg-clip-text text-transparent">
        бизнес управляемым
      </span>
      <span className="block bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
        и масштабируемым
      </span>
    </>
  ),
  subtitle:
    'Проектируем и внедряем единую архитектуру бизнеса: от первой заявки и работы отдела продаж до склада, финансов, аналитики и контроля команды.',
  ctaPrimary: { to: '/contacts', label: 'Получить стратегию автоматизации' },
  ctaSecondary: { to: '/cases', label: 'Смотреть кейсы' },
};

// Кириллица набирается Inter: Michroma — латиница-only, русские буквы в ней
// разъезжаются. Латинские лейблы остаются на Michroma (font-tech).
const chipCls =
  'text-[9px] font-semibold tracking-[.16em] uppercase text-tx-inv2 border border-white/10 rounded-lg px-3 py-2';

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

/** Искры-плюсы из бренд-графики (правое поле композиции) */
function Sparks() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none max-lg:hidden" aria-hidden="true">
      {/* оранжевая точка-акцент */}
      <span
        className="absolute rounded-full bg-brand-orange"
        style={{ top: '46%', right: '3.5%', width: 7, height: 7, opacity: 0.9 }}
      />
      {[
        { top: '12%', right: '4%', size: 10, color: '#D946EF', o: 0.7 },
        { top: '22%', right: '10%', size: 7, color: '#A78BFA', o: 0.5 },
        { top: '46%', right: '2%', size: 8, color: '#F97316', o: 0.6 },
        { top: '64%', right: '8%', size: 6, color: '#D946EF', o: 0.45 },
      ].map((s, i) => (
        <svg
          key={i}
          className="absolute"
          style={{ top: s.top, right: s.right, opacity: s.o }}
          width={s.size}
          height={s.size}
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M5 0v10M0 5h10" stroke={s.color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

export default function Hero() {
  const { settings, pages, getBanner, loading } = useSettings();
  const banner = getBanner('hero');
  const heroBlock = pages.home?.hero;
  const stats = settings.stats || { projects: 150, clients: 80, years: 8, integrations: 300 };
  // Портрет: файл в client/public. Пустая строка — вместо фото орбитальная сцена.
  const PHOTO_SRC = '';
  const [hasPhoto, setHasPhoto] = useState(Boolean(PHOTO_SRC));

  const title = banner?.title ? <span>{banner.title}</span> : defaults.title;
  const subtitle = banner?.subtitle || defaults.subtitle;
  const primary = banner?.link ? { to: banner.link, label: 'Подробнее' } : defaults.ctaPrimary;
  const secondary = {
    to: heroBlock?.ctaSecondaryLink || defaults.ctaSecondary.to,
    label: heroBlock?.ctaSecondaryLabel || defaults.ctaSecondary.label,
  };
  const badge = heroBlock?.badge || defaults.badge;

  return (
    <section className="relative overflow-hidden bg-[#241B4F] text-tx-inv">
      {/* фирменная подложка: индиго-заливка + цифровая сетка по всей ширине */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(90% 120% at 68% 50%, #33265F 0%, #2A2054 45%, #221A48 75%, #1C1540 100%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid-ink pointer-events-none opacity-60" aria-hidden="true" />
      {/* контровой свет: магента слева от фигуры, холодный синий справа */}
      <div
        className="absolute inset-0 pointer-events-none max-lg:hidden"
        style={{
          background:
            'radial-gradient(32% 46% at 66% 58%, rgba(217,70,239,.42) 0%, transparent 70%), radial-gradient(26% 40% at 92% 42%, rgba(37,99,235,.40) 0%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      {banner?.image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${banner.image})` }}
          aria-hidden="true"
        />
      )}

      {/* портрет: во всю высоту секции, в край экрана (за пределы контейнера) */}
      {hasPhoto && (
        <div className="absolute inset-y-0 right-0 w-[44%] max-lg:hidden pointer-events-none overflow-hidden" aria-hidden="true">
          {/* масштаб применяется к обёртке целиком, чтобы цветная маска не съезжала с фигуры */}
          <div className="absolute inset-0" style={{ transform: 'scale(1.22)', transformOrigin: 'bottom right' }}>
            <img
              src={PHOTO_SRC}
              alt=""
              onError={() => setHasPhoto(false)}
              className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain object-bottom"
            />
            {/* цветной свет по самой фигуре: маска — альфа портрета */}
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(105deg, rgba(217,70,239,.62) 0%, rgba(168,85,247,.30) 30%, transparent 52%, rgba(37,99,235,.55) 100%)',
                maskImage: `url(${PHOTO_SRC})`,
                WebkitMaskImage: `url(${PHOTO_SRC})`,
                maskSize: 'auto 100%',
                WebkitMaskSize: 'auto 100%',
                maskPosition: 'right bottom',
                WebkitMaskPosition: 'right bottom',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            />
          </div>
        </div>
      )}

      <Sparks />

      <div className="container-tb relative z-10">
        <div className="lg:max-w-[1000px]">
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="py-20 md:py-24 xl:py-28"
          >
            {!loading && (
              <p className="text-[10px] font-semibold tracking-[.22em] uppercase text-tx-inv2 flex items-center gap-3 mb-6">
                <span className="w-7 h-0.5 bg-g1 rounded-full flex-none" aria-hidden="true" />
                {badge}
              </p>
            )}
            <h1 className="font-display font-semibold text-[30px] leading-[1.14] md:text-[44px] lg:text-[50px] md:leading-[1.1] mb-6">
              {title}
            </h1>
            <p className="text-base md:text-lg text-tx-inv2 mb-8 max-w-xl">{subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <BannerLink href={primary.to} className="btn-primary">
                {primary.label}
              </BannerLink>
              <BannerLink
                href={secondary.to}
                className="btn-secondary !border-white/15 !text-tx-inv hover:!border-brand-magenta"
              >
                {secondary.label}
              </BannerLink>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-9">
              <span className={chipCls}>Междунар. партнёр</span>
              <span className={chipCls}>Битрикс24 партнёр</span>
              <span className={`${chipCls} font-tech !font-normal text-[8.5px]`}>Since 2017 · KZ</span>
            </div>
          </motion.div>

          {/* без портрета правое поле занимает орбитальная сцена */}
          {!hasPhoto && (
            <div
              className="absolute pointer-events-none max-lg:hidden -top-20 -right-24 xl:right-0"
              style={{ width: 720, height: 640 }}
              aria-hidden="true"
            >
              <OrbitalScene className="w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* статистика: Michroma-цифры со счётчиками */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-tb grid grid-cols-2 md:grid-cols-4">
          {[
            { value: stats.projects, suffix: '+', label: 'проектов' },
            { value: stats.clients, suffix: '+', label: 'внедрений' },
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
