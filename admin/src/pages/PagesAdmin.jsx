import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { defaultPages } from '../data/defaultPages';
import { deepMerge } from '../utils/deepMerge';

function Block({ title, hint, children }) {
  return (
    <section className="bg-white rounded-xl shadow p-6 space-y-3">
      <div>
        <h2 className="font-semibold">{title}</h2>
        {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, multiline }) {
  const cls = 'w-full border px-3 py-2 rounded-lg text-sm';
  return (
    <label className="block text-sm">
      <span className="text-gray-600 mb-1 block">{label}</span>
      {multiline ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} className={cls} rows={3} />
      ) : (
        <input value={value || ''} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function SectionTitles({ subtitle, title, onSubtitle, onTitle }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Field label="Подзаголовок (мелкий текст)" value={subtitle} onChange={onSubtitle} />
      <Field label="Заголовок секции" value={title} onChange={onTitle} />
    </div>
  );
}

export default function PagesAdmin() {
  const [tab, setTab] = useState('home');
  const [pages, setPages] = useState(defaultPages);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      const map = {};
      data.settings?.forEach((s) => {
        map[s.key] = s.value;
      });
      setPages(deepMerge(defaultPages, map.pages || {}));
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/settings', { key: 'pages', value: pages });
      toast.success('Блоки сохранены');
    } catch {
      toast.error('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const home = pages.home || {};
  const about = pages.about || {};

  const setHome = (key, value) => setPages({ ...pages, home: { ...home, [key]: value } });
  const setAbout = (key, value) => setPages({ ...pages, about: { ...about, [key]: value } });

  const tabs = [
    { id: 'home', label: 'Главная страница' },
    { id: 'about', label: 'О компании' },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Блоки сайта</h1>
          <p className="text-sm text-gray-500 mt-1">
            Тексты секций главной и страницы «О компании». Баннеры Hero/CTA — в разделе «Баннеры», кейсы и отзывы — в своих разделах.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-6 py-2 bg-admin-accent text-white rounded-lg disabled:opacity-50 shrink-0"
        >
          {saving ? 'Сохранение…' : 'Сохранить всё'}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === t.id ? 'bg-admin-accent text-white' : 'bg-white shadow text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'home' && (
        <div className="space-y-6">
          <Block title="Hero (шапка)" hint="Заголовок и подзаголовок — в «Баннерах» (размещение Hero). Здесь — бейдж и вторая кнопка.">
            <Field label="Бейдж (над заголовком)" value={home.hero?.badge} onChange={(v) => setHome('hero', { ...home.hero, badge: v })} />
            <div className="grid md:grid-cols-2 gap-3">
              <Field
                label="Текст второй кнопки"
                value={home.hero?.ctaSecondaryLabel}
                onChange={(v) => setHome('hero', { ...home.hero, ctaSecondaryLabel: v })}
              />
              <Field
                label="Ссылка второй кнопки"
                value={home.hero?.ctaSecondaryLink}
                onChange={(v) => setHome('hero', { ...home.hero, ctaSecondaryLink: v })}
              />
            </div>
          </Block>

          <Block title="О компании (секция на главной)">
            <SectionTitles
              subtitle={home.about?.subtitle}
              title={home.about?.title}
              onSubtitle={(v) => setHome('about', { ...home.about, subtitle: v })}
              onTitle={(v) => setHome('about', { ...home.about, title: v })}
            />
            {(home.about?.paragraphs || ['']).map((p, i) => (
              <div key={i} className="flex gap-2">
                <Field
                  label={`Абзац ${i + 1}`}
                  value={p}
                  onChange={(v) => {
                    const paragraphs = [...(home.about?.paragraphs || [])];
                    paragraphs[i] = v;
                    setHome('about', { ...home.about, paragraphs });
                  }}
                  multiline
                />
                <button
                  type="button"
                  onClick={() => {
                    const paragraphs = [...(home.about?.paragraphs || [])];
                    paragraphs.splice(i, 1);
                    setHome('about', { ...home.about, paragraphs });
                  }}
                  className="text-red-500 text-sm self-end pb-2 shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setHome('about', {
                  ...home.about,
                  paragraphs: [...(home.about?.paragraphs || []), ''],
                })
              }
              className="text-sm text-admin-accent"
            >
              + Абзац
            </button>
          </Block>

          <Block title="Услуги (заголовки)" hint="Карточки услуг редактируются в разделе «Услуги».">
            <SectionTitles
              subtitle={home.services?.subtitle}
              title={home.services?.title}
              onSubtitle={(v) => setHome('services', { ...home.services, subtitle: v })}
              onTitle={(v) => setHome('services', { ...home.services, title: v })}
            />
          </Block>

          <Block title="Преимущества">
            <SectionTitles
              subtitle={home.benefits?.subtitle}
              title={home.benefits?.title}
              onSubtitle={(v) => setHome('benefits', { ...home.benefits, subtitle: v })}
              onTitle={(v) => setHome('benefits', { ...home.benefits, title: v })}
            />
            {(home.benefits?.items || []).map((item, i) => (
              <div key={i} className="flex gap-2 border-t pt-3">
                <div className="flex-1 grid md:grid-cols-2 gap-2">
                  <Field
                    label="Заголовок"
                    value={item.title}
                    onChange={(v) => {
                      const items = [...home.benefits.items];
                      items[i] = { ...items[i], title: v };
                      setHome('benefits', { ...home.benefits, items });
                    }}
                  />
                  <Field
                    label="Описание"
                    value={item.desc}
                    onChange={(v) => {
                      const items = [...home.benefits.items];
                      items[i] = { ...items[i], desc: v };
                      setHome('benefits', { ...home.benefits, items });
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const items = [...home.benefits.items];
                    items.splice(i, 1);
                    setHome('benefits', { ...home.benefits, items });
                  }}
                  className="text-red-500 text-sm self-center"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setHome('benefits', {
                  ...home.benefits,
                  items: [...(home.benefits?.items || []), { title: '', desc: '' }],
                })
              }
              className="text-sm text-admin-accent"
            >
              + Преимущество
            </button>
          </Block>

          <Block title="Кейсы (заголовки)" hint="Сами кейсы — в разделе «Кейсы».">
            <SectionTitles
              subtitle={home.cases?.subtitle}
              title={home.cases?.title}
              onSubtitle={(v) => setHome('cases', { ...home.cases, subtitle: v })}
              onTitle={(v) => setHome('cases', { ...home.cases, title: v })}
            />
            <Field
              label="Текст кнопки «Все кейсы»"
              value={home.cases?.ctaLabel}
              onChange={(v) => setHome('cases', { ...home.cases, ctaLabel: v })}
            />
          </Block>

          <Block title="Отзывы (заголовки)" hint="Сами отзывы — в разделе «Отзывы».">
            <SectionTitles
              subtitle={home.reviews?.subtitle}
              title={home.reviews?.title}
              onSubtitle={(v) => setHome('reviews', { ...home.reviews, subtitle: v })}
              onTitle={(v) => setHome('reviews', { ...home.reviews, title: v })}
            />
            <Field
              label="Текст кнопки «Все отзывы»"
              value={home.reviews?.ctaLabel}
              onChange={(v) => setHome('reviews', { ...home.reviews, ctaLabel: v })}
            />
          </Block>
        </div>
      )}

      {tab === 'about' && (
        <div className="space-y-6">
          <Block title="Страница «О компании»">
            <Field label="Заголовок страницы (H1)" value={about.pageTitle} onChange={(v) => setAbout('pageTitle', v)} />
          </Block>

          <Block title="История">
            <Field label="Заголовок секции" value={about.history?.title} onChange={(v) => setAbout('history', { ...about.history, title: v })} />
            <Field label="Текст" value={about.history?.text} onChange={(v) => setAbout('history', { ...about.history, text: v })} multiline />
          </Block>

          <Block title="Команда">
            <Field label="Заголовок секции" value={about.team?.title} onChange={(v) => setAbout('team', { ...about.team, title: v })} />
            {(about.team?.members || []).map((m, i) => (
              <div key={i} className="flex gap-2 border-t pt-3">
                <div className="flex-1 grid md:grid-cols-2 gap-2">
                  <Field
                    label="Имя"
                    value={m.name}
                    onChange={(v) => {
                      const members = [...about.team.members];
                      members[i] = { ...members[i], name: v };
                      setAbout('team', { ...about.team, members });
                    }}
                  />
                  <Field
                    label="Должность"
                    value={m.role}
                    onChange={(v) => {
                      const members = [...about.team.members];
                      members[i] = { ...members[i], role: v };
                      setAbout('team', { ...about.team, members });
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const members = [...about.team.members];
                    members.splice(i, 1);
                    setAbout('team', { ...about.team, members });
                  }}
                  className="text-red-500 text-sm self-center"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setAbout('team', {
                  ...about.team,
                  members: [...(about.team?.members || []), { name: '', role: '' }],
                })
              }
              className="text-sm text-admin-accent"
            >
              + Сотрудник
            </button>
          </Block>

          <Block title="Партнёры">
            <Field
              label="Заголовок секции"
              value={about.partners?.title}
              onChange={(v) => setAbout('partners', { ...about.partners, title: v })}
            />
            {(about.partners?.items || []).map((item, i) => (
              <div key={i} className="flex gap-2">
                <Field
                  label={`Партнёр ${i + 1}`}
                  value={item}
                  onChange={(v) => {
                    const items = [...about.partners.items];
                    items[i] = v;
                    setAbout('partners', { ...about.partners, items });
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const items = [...about.partners.items];
                    items.splice(i, 1);
                    setAbout('partners', { ...about.partners, items });
                  }}
                  className="text-red-500 text-sm self-end pb-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setAbout('partners', {
                  ...about.partners,
                  items: [...(about.partners?.items || []), ''],
                })
              }
              className="text-sm text-admin-accent"
            >
              + Партнёр
            </button>
          </Block>

          <Block title="Офис">
            <Field label="Заголовок секции" value={about.office?.title} onChange={(v) => setAbout('office', { ...about.office, title: v })} />
            <Field
              label="URL фото офиса"
              value={about.office?.image}
              onChange={(v) => setAbout('office', { ...about.office, image: v })}
            />
            <Field
              label="Подпись, если нет фото"
              value={about.office?.placeholder}
              onChange={(v) => setAbout('office', { ...about.office, placeholder: v })}
            />
          </Block>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={save} disabled={saving} className="px-6 py-2 bg-admin-accent text-white rounded-lg disabled:opacity-50">
          {saving ? 'Сохранение…' : 'Сохранить всё'}
        </button>
      </div>
    </div>
  );
}
