import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';

export default function AboutSnippet() {
  const { pages } = useSettings();
  const block = pages.home?.about;

  return (
    <Section id="about" subtitle={block?.subtitle} title={block?.title}>
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
        <div className="max-w-3xl text-base md:text-lg text-tx2 dark:text-tx-inv2 leading-relaxed">
          {(block?.paragraphs || []).map((p, i) => (
            <p key={i} className={i < (block.paragraphs.length - 1) ? 'mb-4' : ''}>
              {p}
            </p>
          ))}
        </div>
        <div className="hidden lg:block w-px self-stretch bg-g2 opacity-40" aria-hidden="true" />
      </div>
    </Section>
  );
}
