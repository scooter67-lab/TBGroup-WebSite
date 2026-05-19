import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContactForm from '../components/ui/ContactForm';
import { useSettings } from '../context/SettingsContext';

export default function Contacts() {
  const { settings } = useSettings();
  const c = settings.contacts || {};

  return (
    <>
      <SEO title="Контакты" description="Свяжитесь с TB Group" path="/contacts" />
      <section className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: 'Контакты' }]} />
          <h1 className="heading-1 mb-10">Контакты</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6 mb-8">
                {c.phone && (
                  <div>
                    <p className="text-sm text-brand-muted">Телефон</p>
                    <a href={`tel:${c.phone}`} className="text-xl font-semibold hover:text-brand-accent">
                      {c.phone}
                    </a>
                  </div>
                )}
                {c.email && (
                  <div>
                    <p className="text-sm text-brand-muted">Email</p>
                    <a href={`mailto:${c.email}`} className="text-xl font-semibold hover:text-brand-accent">
                      {c.email}
                    </a>
                  </div>
                )}
                {c.address && (
                  <div>
                    <p className="text-sm text-brand-muted">Адрес</p>
                    <p className="text-lg">{c.address}</p>
                  </div>
                )}
                <div className="flex gap-4">
                  {c.telegram && (
                    <a href={c.telegram} target="_blank" rel="noreferrer" className="btn-outline py-2">
                      Telegram
                    </a>
                  )}
                  {c.whatsapp && (
                    <a href={c.whatsapp} target="_blank" rel="noreferrer" className="btn-primary py-2">
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <ContactForm />
            </div>

            <div className="rounded-2xl overflow-hidden min-h-[400px] bg-brand-gray dark:bg-brand-navy-light">
              {c.mapLat && c.mapLng ? (
                <iframe
                  title="Карта"
                  className="w-full h-full min-h-[400px] border-0"
                  src={`https://yandex.ru/map-widget/v1/?ll=${c.mapLng}%2C${c.mapLat}&z=16&pt=${c.mapLng},${c.mapLat},pm2rdm`}
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full text-brand-muted">Карта</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
