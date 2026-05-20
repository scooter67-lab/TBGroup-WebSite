import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/cases', label: 'Кейсы' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/services', label: 'Услуги' },
  { to: '/banners', label: 'Баннеры' },
  { to: '/pages', label: 'Блоки сайта' },
  { to: '/contacts', label: 'Заявки' },
  { to: '/settings', label: 'Настройки' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-admin-sidebar text-white flex flex-col shrink-0">
        <div className="p-6 font-bold text-xl border-b border-white/10">TB Admin</div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-admin-accent text-white' : 'hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-sm text-gray-400 truncate">{user?.email}</p>
          <button type="button" onClick={handleLogout} className="mt-2 text-sm text-red-300 hover:text-red-200">
            Выйти
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
