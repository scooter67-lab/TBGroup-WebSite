import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';

// Услуги под общим пунктом меню; Битрикс24 остаётся на верхнем уровне.
const serviceLinks = [
  { to: '/services/moysklad', label: 'МойСклад' },
  { to: '/services/telephony', label: 'Телефония' },
];

const links = [
  { to: '/services/bitrix24', label: 'Битрикс24' },
  { to: '/cases', label: 'Кейсы' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10L5.6 18.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5Z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const navLinkCls = ({ isActive }) =>
  `relative text-sm font-medium py-1.5 transition-colors ${
    isActive
      ? 'text-tx dark:text-tx-inv after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-g1'
      : 'text-tx2 dark:text-tx-inv2 hover:text-tx dark:hover:text-tx-inv'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { pathname } = useLocation();
  const servicesActive = serviceLinks.some((l) => l.to === pathname);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(servicesActive);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line bg-paper/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink/85">
      <div className="container-tb flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" className="flex items-center" aria-label="TB Group — на главную">
          <img src={logoLight} alt="TB Group" className="h-8 w-auto dark:hidden" />
          <img src={logoDark} alt="TB Group" className="hidden h-8 w-auto dark:block" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Основная навигация">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`${navLinkCls({ isActive: servicesActive })} inline-flex items-center gap-1.5`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Услуги
              <ChevronIcon open={servicesOpen} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute left-0 top-full pt-3"
                >
                  <div className="min-w-[190px] rounded-xl border border-paper-line bg-white p-1.5 shadow-card-h dark:border-white/10 dark:bg-ink-4">
                    {serviceLinks.map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        onClick={() => setServicesOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-paper-2 text-tx dark:bg-ink-3 dark:text-tx-inv'
                              : 'text-tx2 hover:bg-paper-2 hover:text-tx dark:text-tx-inv2 dark:hover:bg-ink-3 dark:hover:text-tx-inv'
                          }`
                        }
                      >
                        {l.label}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggle}
            className="p-2.5 rounded-xl text-tx2 hover:bg-paper-2 dark:text-tx-inv2 dark:hover:bg-ink-3 transition-colors"
            aria-label={dark ? 'Светлая тема' : 'Тёмная тема'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link to="/contacts" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5">
            Оставить заявку
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 text-tx dark:text-tx-inv"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-paper-line dark:border-white/10 overflow-hidden"
            aria-label="Мобильная навигация"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between py-2.5 px-2 rounded-lg font-medium text-tx2 dark:text-tx-inv2 hover:bg-paper-2 dark:hover:bg-ink-3"
                aria-expanded={mobileServicesOpen}
              >
                Услуги
                <ChevronIcon open={mobileServicesOpen} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-2 pl-3 flex flex-col gap-1 border-l border-paper-line dark:border-white/10">
                  {serviceLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="py-2.5 px-2 rounded-lg font-medium text-tx2 dark:text-tx-inv2 hover:bg-paper-2 dark:hover:bg-ink-3"
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              )}
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-2 rounded-lg font-medium text-tx2 dark:text-tx-inv2 hover:bg-paper-2 dark:hover:bg-ink-3"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contacts" onClick={() => setOpen(false)} className="btn-primary text-center mt-3">
                Оставить заявку
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
