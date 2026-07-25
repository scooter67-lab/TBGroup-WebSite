import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { DotsWave } from '../ui/Decor';
import logoDark from '../../assets/logo-dark.webp';

export default function Footer() {
  const { settings } = useSettings();
  const contacts = settings.contacts || {};

  return (
    <footer className="relative bg-ink text-tx-inv overflow-hidden">
      <div className="hairline-g2" aria-hidden="true" />
      <DotsWave className="absolute -bottom-2 left-0 w-full h-20 opacity-40 pointer-events-none" />
      <div className="container-tb section-pad relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="md:col-span-2">
            <img src={logoDark} alt="TB Group" className="h-9 w-auto mb-6" />
            <p className="text-body !text-tx-inv2 max-w-md">
              Внедрение и интеграция облачных решений: МойСклад, Битрикс24, IP-телефония и CRM.
              Системный подход к вашему успеху.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="chip-tech text-tx-inv2 border-white/10">Moysklad · Partner</span>
              <span className="chip-tech text-tx-inv2 border-white/10">Bitrix24 · Partner</span>
              <span className="chip-tech text-tx-inv2 border-white/10">Since 2017 · KZ</span>
            </div>
          </div>
          <div>
            <h4 className="label-tech !text-tx-inv3 mb-6">Услуги</h4>
            <ul className="space-y-3 text-tx-inv2 text-[15px]">
              <li><Link to="/services/moysklad" className="hover:text-tx-inv transition-colors duration-250">МойСклад</Link></li>
              <li><Link to="/services/bitrix24" className="hover:text-tx-inv transition-colors duration-250">Битрикс24</Link></li>
              <li><Link to="/services/telephony" className="hover:text-tx-inv transition-colors duration-250">Телефония</Link></li>
              <li><Link to="/cases" className="hover:text-tx-inv transition-colors duration-250">Кейсы</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="label-tech !text-tx-inv3 mb-6">Контакты</h4>
            <ul className="space-y-3 text-tx-inv2 text-[15px]">
              {contacts.phone && (
                <li><a href={`tel:${contacts.phone}`} className="hover:text-tx-inv transition-colors duration-250">{contacts.phone}</a></li>
              )}
              {contacts.email && (
                <li><a href={`mailto:${contacts.email}`} className="hover:text-tx-inv transition-colors duration-250 break-all">{contacts.email}</a></li>
              )}
              {contacts.address && <li>{contacts.address}</li>}
              {contacts.telegram && (
                <li><a href={contacts.telegram} target="_blank" rel="noreferrer" className="hover:text-tx-inv transition-colors duration-250">Telegram</a></li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[14px] text-tx-inv3">© {new Date().getFullYear()} TB Group. Все права защищены.</span>
          <span className="font-tech text-[10px] tracking-[.2em] uppercase text-tx-inv3">Создаём будущее Казахстана</span>
        </div>
      </div>
    </footer>
  );
}
