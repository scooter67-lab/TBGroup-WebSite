import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const empty = {
  title: '',
  subtitle: '',
  image: '',
  link: '',
  placement: 'hero',
  active: true,
  order: 0,
};

const placements = [
  { value: 'hero', label: 'Главный экран (Hero)' },
  { value: 'cta', label: 'Блок заявки (CTA)' },
  { value: 'sidebar', label: 'Боковая панель (пока не используется)' },
];

export default function BannersAdmin() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState(null);

  const load = () => api.get('/settings/banners').then(({ data }) => setBanners(data));
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = form;
      if (_id) await api.put(`/settings/banners/${_id}`, payload);
      else await api.post('/settings/banners', payload);
      toast.success('Сохранено');
      setForm(null);
      load();
    } catch {
      toast.error('Ошибка сохранения');
    }
  };

  const remove = async (id) => {
    if (!confirm('Удалить баннер?')) return;
    await api.delete(`/settings/banners/${id}`);
    toast.success('Удалено');
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Баннеры</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hero — шапка главной · CTA — блок с формой внизу главной. Только активные баннеры видны на сайте.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...empty })}
          className="px-4 py-2 bg-admin-accent text-white rounded-lg shrink-0"
        >
          + Добавить
        </button>
      </div>

      <ul className="space-y-2 mb-6">
        {banners.map((b) => (
          <li key={b._id} className="bg-white rounded-lg shadow px-4 py-3 flex justify-between items-center gap-4">
            <div className="min-w-0">
              <span className="font-medium">{b.title}</span>
              <span className="text-gray-500 text-sm ml-2">
                {placements.find((p) => p.value === b.placement)?.label || b.placement}
                {!b.active && ' · выкл.'}
              </span>
              {b.subtitle && <p className="text-sm text-gray-400 truncate">{b.subtitle}</p>}
            </div>
            <div className="flex gap-3 shrink-0">
              <button type="button" onClick={() => setForm({ ...b })} className="text-admin-accent text-sm hover:underline">
                Изменить
              </button>
              <button type="button" onClick={() => remove(b._id)} className="text-red-500 text-sm hover:underline">
                Удалить
              </button>
            </div>
          </li>
        ))}
        {!banners.length && <li className="text-gray-400 text-sm">Баннеров пока нет</li>}
      </ul>

      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={save} className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">{form._id ? 'Редактировать баннер' : 'Новый баннер'}</h2>
            <input
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Заголовок"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <textarea
              value={form.subtitle || ''}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Подзаголовок / описание"
              className="w-full border px-3 py-2 rounded-lg"
              rows={3}
            />
            <label className="block text-sm">
              Размещение
              <select
                value={form.placement || 'hero'}
                onChange={(e) => setForm({ ...form, placement: e.target.value })}
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              >
                {placements.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <input
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="URL картинки (фон Hero или картинка в CTA)"
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              value={form.link || ''}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="Ссылка кнопки (/contacts или https://...)"
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              value={form.order ?? 0}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              placeholder="Порядок (меньше — выше приоритет)"
              className="w-full border px-3 py-2 rounded-lg"
            />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Активен (показывать на сайте)
            </label>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 py-2 bg-admin-accent text-white rounded-lg">
                Сохранить
              </button>
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2 border rounded-lg">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
