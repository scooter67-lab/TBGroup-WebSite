import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { to: '/services/moysklad', label: 'МойСклад' },
  { to: '/services/bitrix24', label: 'Битрикс24' },
  { to: '/services/telephony', label: 'Телефония' },
  { to: '/cases', label: 'Кейсы' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="container-narrow flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-navy dark:text-white">
          <span className="w-9 h-9 rounded-lg bg-brand-navy text-brand-accent flex items-center justify-center text-sm">
            TB
          </span>
          <span>TB Group</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brand-accent ${
                  isActive ? 'text-brand-accent' : 'text-brand-muted dark:text-gray-300'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-brand-navy-light"
            aria-label="Тема"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <Link to="/contacts" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5">
            Оставить заявку
          </Link>
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            <span className="text-2xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-brand-navy-light overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2 font-medium hover:text-brand-accent"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contacts" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
                Оставить заявку
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
