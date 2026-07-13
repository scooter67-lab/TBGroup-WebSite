import { useSettings } from '../context/SettingsContext';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { DotsField } from '../components/ui/Decor';

export default function About() {
  const { pages } = useSettings();
  const block = pages.about || {};
  const members = block.team?.members || [];
  const partners = block.partners?.items || [];

  return (
    <>
      <SEO title="О компании" description="TB Group — интегратор облачных решений в Алматы: история, команда и партнёрские статусы МойСклад и Битрикс24." path="/about" />
      <section className="section-pad">
        <div className="container-tb">
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          <p className="eyebrow mb-4">Архитекторы вашего роста</p>
          <h1 className="heading-1 mb-12">{block.pageTitle || 'О компании'}</h1>

          <section className="mb-16 grid lg:grid-cols-[1fr_auto] gap-10">
            <div className="max-w-3xl">
              <h2 className="heading-2 mb-5">{block.history?.title}</h2>
              <p className="text-tx2 dark:text-tx-inv2 leading-relaxed text-[16px]">{block.history?.text}</p>
            </div>
            <div className="hidden lg:block w-px self-stretch bg-g2 opacity-40" aria-hidden="true" />
          </section>

          {members.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-4">Команда</p>
              <h2 className="heading-2 mb-10">{block.team?.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {members.map((m, i) => (
                  <div key={`${m.name}-${i}`} className="card-tb p-6">
                    <div className="w-14 h-14 rounded-xl bg-g1 flex items-center justify-center font-tech text-lg text-white mb-4">
                      {m.name?.[0]}
                    </div>
                    <h3 className="font-bold">{m.name}</h3>
                    <p className="text-sm text-tx2 dark:text-tx-inv2 mt-1">{m.role}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {partners.length > 0 && (
            <section className="mb-16">
              <p className="eyebrow mb-4">Партнёрство</p>
              <h2 className="heading-2 mb-8">{block.partners?.title}</h2>
              <div className="flex flex-wrap gap-3">
                {partners.map((p) => (
                  <span key={p} className="font-tech text-[10px] tracking-[.15em] uppercase border border-paper-line2 dark:border-white/15 rounded-xl px-5 py-3.5 text-tx2 dark:text-tx-inv2">
                    {p}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <p className="eyebrow mb-4">Офис · Алматы</p>
            <h2 className="heading-2 mb-8">{block.office?.title}</h2>
            {block.office?.image ? (
              <img src={block.office.image} alt={block.office.title} className="w-full aspect-video object-cover rounded-3xl" />
            ) : (
              <div className="relative aspect-[21/9] rounded-3xl bg-ink overflow-hidden flex items-center justify-center">
                <DotsField className="absolute inset-0" opacity={0.5} />
                <div className="relative text-center px-6">
                  <p className="font-tech text-[10px] tracking-[.22em] uppercase text-tx-inv2 mb-3">TB Group · Алматы</p>
                  <p className="text-tx-inv2 text-sm">г. Алматы, ул. Рыскулова, 140/4, оф. 201</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
