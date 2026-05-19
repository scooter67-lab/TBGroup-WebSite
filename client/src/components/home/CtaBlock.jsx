import { Link } from 'react-router-dom';
import ContactForm from '../ui/ContactForm';
import { Section } from './Section';

export default function CtaBlock() {
  return (
    <Section id="cta" className="bg-white dark:bg-brand-navy">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="heading-2 mb-4">Готовы оптимизировать бизнес-процессы?</h2>
          <p className="text-brand-muted dark:text-gray-400 mb-6">
            Оставьте заявку — проведём бесплатную консультацию и предложим решение под ваши задачи.
          </p>
          <Link to="/contacts" className="btn-outline">
            Контакты и карта
          </Link>
        </div>
        <div className="glass rounded-2xl p-8">
          <h3 className="font-bold text-lg mb-4">Быстрая заявка</h3>
          <ContactForm compact />
        </div>
      </div>
    </Section>
  );
}
