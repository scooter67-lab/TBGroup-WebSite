import ContactForm from '../ui/ContactForm';
import { useSettings } from '../../context/SettingsContext';
import { DotsField } from '../ui/Decor';

const defaults = {
  title: 'Готовы оптимизировать бизнес-процессы?',
  subtitle: 'Оставьте заявку — проведём бесплатную консультацию и предложим решение под ваши задачи.',
};

export default function CtaBlock() {
  const { getBanner } = useSettings();
  const banner = getBanner('cta');

  const title = banner?.title || defaults.title;
  const subtitle = banner?.subtitle || defaults.subtitle;

  return (
    <section id="cta" className="section-pad bg-paper dark:bg-ink">
      <div className="container-tb">
        <div className="panel-ink">
          <DotsField className="absolute inset-0 pointer-events-none" opacity={0.35} />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-12 xl:p-16 items-center">
            <div>
              <p className="eyebrow !text-tx-inv2 mb-5">Ваш бизнес. Наша система. Ваш успех.</p>
              <h2 className="heading-2 text-tx-inv mb-5">{title}</h2>
              <p className="text-body !text-tx-inv2 max-w-lg">{subtitle}</p>
            </div>
            <div className="card-tb !bg-ink-3 !border-white/10 p-6 md:p-8">
              <h3 className="card-title mb-6 text-tx-inv">Быстрая заявка</h3>
              <ContactForm compact onInk />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
