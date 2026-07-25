import { useSettings } from '../context/SettingsContext';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { DotsField } from '../components/ui/Decor';
import CertificateGallery from '../components/ui/CertificateGallery';

export default function About() {
  const { pages } = useSettings();
  const block = pages.about || {};
  const members = block.team?.members || [];
  const partners = block.partners?.items || [];
  const certificates = block.partners?.certificates || [];

  return (
    <>
      <SEO title="О компании" description="TB Group — интегратор облачных решений в Алматы: история, команда и партнёрские статусы МойСклад и Битрикс24." path="/about" />
      <section className="section-pad">
        <div className="container-tb">
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          <p className="eyebrow mb-5">Архитекторы вашего роста</p>
          <h1 className="heading-1 mb-16">{block.pageTitle || 'О компании'}</h1>

          <section className="mb-20 grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16">
            <div className="max-w-3xl">
              <h2 className="heading-2 mb-8">{block.history?.title}</h2>
              {/* Абзацы разделяются пустой строкой — в админке это одно многострочное поле */}
              {(block.history?.text || '')
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((p, i, arr) => (
                  <p key={i} className={`text-body ${i < arr.length - 1 ? 'mb-5' : ''}`}>
                    {p}
                  </p>
                ))}
            </div>
            <div className="hidden lg:block w-px self-stretch bg-g2 opacity-40" aria-hidden="true" />
          </section>

          {members.length > 0 && (
            <section className="mb-20">
              <p className="eyebrow mb-5">Команда</p>
              <h2 className="heading-2 mb-8">{block.team?.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((m, i) => (
                  <div key={`${m.name}-${i}`} className="card-tb overflow-hidden">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-g1 flex items-center justify-center font-tech text-5xl text-white">
                        {m.name?.[0]}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="card-title">{m.name}</h3>
                      <p className="text-body-sm mt-2">{m.role}</p>
                      {m.description && <p className="text-body-sm mt-4">{m.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(partners.length > 0 || certificates.length > 0) && (
            <section className="mb-20">
              <p className="eyebrow mb-5">Партнёрство</p>
              <h2 className="heading-2 mb-8">{block.partners?.title}</h2>
              {partners.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {partners.map((p) => (
                    <span key={p} className="chip-tech border-paper-line2 dark:border-white/15 text-tx2 dark:text-tx-inv2">
                      {p}
                    </span>
                  ))}
                </div>
              )}
              {certificates.length > 0 && (
                <div className={partners.length > 0 ? 'mt-10' : ''}>
                  <CertificateGallery items={certificates} />
                </div>
              )}
            </section>
          )}

          <section>
            <p className="eyebrow mb-5">Офис · Алматы</p>
            <h2 className="heading-2 mb-8">{block.office?.title}</h2>
            {block.office?.image ? (
              <img src={block.office.image} alt={block.office.title} className="w-full aspect-video object-cover rounded-3xl" loading="lazy" />
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
