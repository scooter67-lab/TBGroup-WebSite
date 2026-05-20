import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CrudTable from '../components/CrudTable';

const empty = {
  author: '',
  company: '',
  position: '',
  text: '',
  rating: 5,
  type: 'text',
  videoUrl: '',
  avatar: '',
  published: false,
  moderated: false,
  order: 0,
};

const truncate = (s, n = 60) => {
  if (!s) return '—';
  return s.length > n ? `${s.slice(0, n)}…` : s;
};

export default function ReviewsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [view, setView] = useState(null);

  const load = () => api.get('/reviews?all=true').then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = form;
      if (_id) await api.put(`/reviews/${_id}`, payload);
      else await api.post('/reviews/admin', payload);
      toast.success('Сохранено');
      setForm(null);
      load();
    } catch {
      toast.error('Ошибка сохранения');
    }
  };

  const moderate = async (id, published = true) => {
    await api.patch(`/reviews/${id}/moderate`, { published });
    toast.success('Модерация обновлена');
    load();
  };

  const remove = async (id) => {
    if (!confirm('Удалить?')) return;
    await api.delete(`/reviews/${id}`);
    toast.success('Удалено');
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Отзывы</h1>
        <button
          type="button"
          onClick={() => setForm({ ...empty })}
          className="px-4 py-2 bg-admin-accent text-white rounded-lg"
        >
          + Добавить
        </button>
      </div>
      <CrudTable
        columns={[
          { key: 'author', label: 'Автор' },
          {
            key: 'text',
            label: 'Текст',
            render: (r) => (
              <span className="text-gray-600 max-w-xs block truncate" title={r.text}>
                {truncate(r.text)}
              </span>
            ),
          },
          { key: 'rating', label: 'Рейтинг' },
          { key: 'moderated', label: 'Модер.', render: (r) => (r.moderated ? '✓' : '⏳') },
          { key: 'published', label: 'Опубл.', render: (r) => (r.published ? '✓' : '—') },
        ]}
        rows={items}
        onEdit={setForm}
        onDelete={remove}
        extraActions={(row) => (
          <>
            <button type="button" onClick={() => setView(row)} className="text-blue-600 text-xs hover:underline">
              Читать
            </button>
            {!row.moderated && (
              <button type="button" onClick={() => moderate(row._id)} className="text-green-600 text-xs hover:underline">
                Одобрить
              </button>
            )}
          </>
        )}
      />

      {view && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">Отзыв</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-semibold text-gray-500">Автор</dt>
                <dd>{view.author}</dd>
              </div>
              {view.company && (
                <div>
                  <dt className="font-semibold text-gray-500">Компания</dt>
                  <dd>{view.company}</dd>
                </div>
              )}
              {view.position && (
                <div>
                  <dt className="font-semibold text-gray-500">Должность</dt>
                  <dd>{view.position}</dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-gray-500">Рейтинг</dt>
                <dd>{view.rating} / 5</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">Текст</dt>
                <dd className="whitespace-pre-wrap border rounded-lg p-3 bg-gray-50 mt-1">{view.text || '—'}</dd>
              </div>
              {view.type !== 'text' && view.videoUrl && (
                <div>
                  <dt className="font-semibold text-gray-500">Видео</dt>
                  <dd>
                    <a href={view.videoUrl} target="_blank" rel="noreferrer" className="text-admin-accent break-all">
                      {view.videoUrl}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-gray-500">Статус</dt>
                <dd>
                  {view.moderated ? 'Промодерирован' : 'На модерации'}
                  {view.published ? ', опубликован' : ', не опубликован'}
                </dd>
              </div>
              {view.createdAt && (
                <div>
                  <dt className="font-semibold text-gray-500">Дата</dt>
                  <dd>{new Date(view.createdAt).toLocaleString('ru-RU')}</dd>
                </div>
              )}
            </dl>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForm({ ...view });
                  setView(null);
                }}
                className="flex-1 py-2 bg-admin-accent text-white rounded-lg"
              >
                Редактировать
              </button>
              <button type="button" onClick={() => setView(null)} className="px-4 py-2 border rounded-lg">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={save} className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">{form._id ? 'Редактировать отзыв' : 'Новый отзыв'}</h2>
            <input
              value={form.author || ''}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Автор"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              value={form.company || ''}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Компания"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              value={form.position || ''}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="Должность"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <textarea
              value={form.text || ''}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Текст отзыва"
              className="w-full px-3 py-2 border rounded-lg"
              rows={5}
              required
            />
            <div className="flex gap-3">
              <label className="flex-1 text-sm">
                Рейтинг
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating ?? 5}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                />
              </label>
              <label className="flex-1 text-sm">
                Порядок
                <input
                  type="number"
                  value={form.order ?? 0}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                />
              </label>
            </div>
            <label className="block text-sm">
              Тип
              <select
                value={form.type || 'text'}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              >
                <option value="text">Текст</option>
                <option value="youtube">YouTube</option>
                <option value="mp4">MP4</option>
              </select>
            </label>
            {form.type !== 'text' && (
              <input
                value={form.videoUrl || ''}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="URL видео"
                className="w-full px-3 py-2 border rounded-lg"
              />
            )}
            <input
              value={form.avatar || ''}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              placeholder="URL аватара"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!form.moderated} onChange={(e) => setForm({ ...form, moderated: e.target.checked })} />
              Промодерирован
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Опубликован
            </label>
            <div className="flex gap-2">
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
