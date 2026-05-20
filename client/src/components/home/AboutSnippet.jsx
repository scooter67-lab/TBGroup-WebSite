import { useSettings } from '../../context/SettingsContext';
import { Section } from './Section';

export default function AboutSnippet() {
  const { pages } = useSettings();
  const block = pages.home?.about;

  return (
    <Section id="about" subtitle={block?.subtitle} title={block?.title}>
      <div className="max-w-3xl mx-auto text-center text-lg text-brand-muted dark:text-gray-300 leading-relaxed">
        {(block?.paragraphs || []).map((p, i) => (
          <p key={i} className={i < (block.paragraphs.length - 1) ? 'mb-4' : ''}>
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
