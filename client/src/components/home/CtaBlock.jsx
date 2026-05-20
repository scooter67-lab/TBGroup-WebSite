import { Link } from 'react-router-dom';
import ContactForm from '../ui/ContactForm';
import { Section } from './Section';
import { useSettings } from '../../context/SettingsContext';

const defaults = {
  title: 'Готовы оптимизировать бизнес-процессы?',
  subtitle: 'Оставьте заявку — проведём бесплатную консультацию и предложим решение под ваши задачи.',
  link: { to: '/contacts', label: 'Контакты и карта' },
};

function CtaLink({ href, className, children }) {
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

export default function CtaBlock() {
  const { getBanner } = useSettings();
  const banner = getBanner('cta');

  const title = banner?.title || defaults.title;
  const subtitle = banner?.subtitle || defaults.subtitle;
  const linkHref = banner?.link || defaults.link.to;
  const linkLabel = banner?.link ? 'Подробнее' : defaults.link.label;

  return (
    <Section id="cta" className="bg-white dark:bg-brand-navy">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {banner?.image && (
            <img src={banner.image} alt="" className="rounded-xl mb-6 max-h-48 object-cover w-full" />
          )}
          <h2 className="heading-2 mb-4">{title}</h2>
          <p className="text-brand-muted dark:text-gray-400 mb-6">{subtitle}</p>
          <CtaLink href={linkHref} className="btn-outline">
            {linkLabel}
          </CtaLink>
        </div>
        <div className="glass rounded-2xl p-8">
          <h3 className="font-bold text-lg mb-4">Быстрая заявка</h3>
          <ContactForm compact />
        </div>
      </div>
    </Section>
  );
}
