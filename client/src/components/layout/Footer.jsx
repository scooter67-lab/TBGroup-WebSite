import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();
  const contacts = settings.contacts || {};

  return (
    <footer className="bg-brand-navy text-white section-padding">
      <div className="container-narrow grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-xl mb-4">
            <span className="w-9 h-9 rounded-lg bg-brand-accent text-white flex items-center justify-center text-sm">
              TB
            </span>
            TB Group
          </div>
          <p className="text-gray-400 max-w-md">
            Внедрение и интеграция облачных решений: МойСклад, Битрикс24, IP-телефония и CRM.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Услуги</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/services/moysklad" className="hover:text-brand-accent">МойСклад</Link></li>
            <li><Link to="/services/bitrix24" className="hover:text-brand-accent">Битрикс24</Link></li>
            <li><Link to="/services/telephony" className="hover:text-brand-accent">Телефония</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Контакты</h4>
          <ul className="space-y-2 text-gray-400">
            {contacts.phone && <li><a href={`tel:${contacts.phone}`}>{contacts.phone}</a></li>}
            {contacts.email && <li><a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>}
            {contacts.telegram && (
              <li><a href={contacts.telegram} target="_blank" rel="noreferrer">Telegram</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="container-narrow mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TB Group. Все права защищены.
      </div>
    </footer>
  );
}
