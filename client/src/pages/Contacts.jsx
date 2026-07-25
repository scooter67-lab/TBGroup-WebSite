import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContactForm from '../components/ui/ContactForm';
import { useSettings } from '../context/SettingsContext';
import { DotsField } from '../components/ui/Decor';

export default function Contacts() {
  const { settings } = useSettings();
  const c = settings.contacts || {};

  return (
    <>
      <SEO title="Контакты" description="Контакты TB Group в Алматы: телефон +7 (708) 800-49-49, офис на ул. Рыскулова, 140/4. Консультация по МойСклад, Битрикс24 и телефонии." path="/contacts" />
      <section className="section-pad">
        <div className="container-tb">
          <Breadcrumbs items={[{ label: 'Контакты' }]} />
          <p className="eyebrow mb-5">Связаться с нами</p>
          <h1 className="heading-1 mb-16">Контакты</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {c.phone && (
                  <div className="stat-tb">
                    <p className="label-tech mb-2">Телефон</p>
                    <a href={`tel:${c.phone}`} className="text-lg font-semibold hover:text-brand-magenta transition-colors duration-250">
                      {c.phone}
                    </a>
                  </div>
                )}
                {c.email && (
                  <div className="stat-tb">
                    <p className="label-tech mb-2">Email</p>
                    <a href={`mailto:${c.email}`} className="text-lg font-semibold hover:text-brand-magenta transition-colors duration-250 break-all">
                      {c.email}
                    </a>
                  </div>
                )}
                {c.address && (
                  <div className="stat-tb sm:col-span-2">
                    <p className="label-tech mb-2">Адрес</p>
                    <p className="text-base">{c.address}</p>
                  </div>
                )}
              </div>
              {(c.telegram || c.whatsapp) && (
                <div className="flex gap-3 mb-10">
                  {c.telegram && (
                    <a href={c.telegram} target="_blank" rel="noreferrer" className="btn-secondary btn-sm">
                      Telegram
                    </a>
                  )}
                  {c.whatsapp && (
                    <a href={c.whatsapp} target="_blank" rel="noreferrer" className="btn-primary btn-sm">
                      WhatsApp
                    </a>
                  )}
                </div>
              )}
              <h2 className="text-lg font-bold mb-5">Заказать звонок</h2>
              <ContactForm />
            </div>

            <div className="rounded-3xl overflow-hidden min-h-[420px] border border-paper-line dark:border-white/10">
              {c.mapLat && c.mapLng ? (
                <iframe
                  title="Карта"
                  className="w-full h-full min-h-[420px] border-0"
                  src={`https://yandex.ru/map-widget/v1/?ll=${c.mapLng}%2C${c.mapLat}&z=16&pt=${c.mapLng},${c.mapLat},pm2rdm`}
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full min-h-[420px] bg-ink flex items-center justify-center">
                  <DotsField className="absolute inset-0" opacity={0.5} />
                  <div className="relative text-center px-6">
                    <p className="font-tech text-[10px] tracking-[.22em] uppercase text-tx-inv2 mb-3">TB Group · Алматы</p>
                    <p className="text-tx-inv2 text-sm max-w-xs">
                      {c.address || 'г. Алматы, ул. Рыскулова, 140/4, оф. 201'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
