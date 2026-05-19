import { Section } from './Section';

export default function AboutSnippet() {
  return (
    <Section id="about" subtitle="О компании" title="TB Group — ваш IT-партнёр">
      <div className="max-w-3xl mx-auto text-center text-lg text-brand-muted dark:text-gray-300 leading-relaxed">
        <p className="mb-4">
          Мы специализируемся на внедрении и интеграции облачных решений для малого и среднего бизнеса.
          Наша команда объединяет экспертизу в МойСклад, Битрикс24 и IP-телефонии.
        </p>
        <p>
          Помогаем автоматизировать склад, продажи и коммуникации — от первого аудита до долгосрочного
          сопровождения.
        </p>
      </div>
    </Section>
  );
}
