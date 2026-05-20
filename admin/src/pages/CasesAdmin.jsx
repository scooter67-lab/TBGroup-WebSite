import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CrudTable from '../components/CrudTable';

const empty = {
  title: '',
  client: '',
  industry: '',
  task: '',
  solution: '',
  result: '',
  services: [],
  metrics: [],
  published: true,
  featured: false,
};

const fieldLabels = {
  title: 'Название',
  client: 'Клиент',
  industry: 'Отрасль',
  task: 'Задача',
  solution: 'Решение',
  result: 'Результат',
};

export default function CasesAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);

  const load = () => api.get('/cases?all=true').then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = form;
      payload.metrics = (payload.metrics || []).filter((m) => m.value?.trim() || m.label?.trim());
      if (_id) await api.put(`/cases/${_id}`, payload);
      else await api.post('/cases', payload);
      toast.success('Сохранено');
      setForm(null);
      load();
    } catch {
      toast.error('Ошибка сохранения');
    }
  };

  const remove = async (id) => {
    if (!confirm('Удалить?')) return;
    await api.delete(`/cases/${id}`);
    toast.success('Удалено');
    load();
  };

  const updateMetric = (index, field, value) => {
    const metrics = [...(form.metrics || [])];
    metrics[index] = { ...metrics[index], [field]: value };
    setForm({ ...form, metrics });
  };

  const addMetric = () => {
    setForm({ ...form, metrics: [...(form.metrics || []), { value: '', label: '' }] });
  };

  const removeMetric = (index) => {
    const metrics = [...(form.metrics || [])];
    metrics.splice(index, 1);
    setForm({ ...form, metrics });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Кейсы</h1>
        <button type="button" onClick={() => setForm({ ...empty })} className="px-4 py-2 bg-admin-accent text-white rounded-lg">
          + Добавить
        </button>
      </div>
      <CrudTable
        columns={[
          { key: 'title', label: 'Название' },
          { key: 'client', label: 'Клиент' },
          {
            key: 'metrics',
            label: 'Показатели',
            render: (r) => (r.metrics?.length ? `${r.metrics.length} шт.` : '—'),
          },
          { key: 'published', label: 'Опубл.', render: (r) => (r.published ? '✓' : '—') },
        ]}
        rows={items}
        onEdit={(row) => setForm({ ...empty, ...row, metrics: row.metrics?.length ? [...row.metrics] : [] })}
        onDelete={remove}
      />
      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={save} className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">{form._id ? 'Редактировать' : 'Новый кейс'}</h2>
            {['title', 'client', 'industry', 'task', 'solution', 'result'].map((f) =>
              ['task', 'solution', 'result'].includes(f) ? (
                <textarea
                  key={f}
                  placeholder={fieldLabels[f]}
                  value={form[f] || ''}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  required
                />
              ) : (
                <input
                  key={f}
                  placeholder={fieldLabels[f]}
                  value={form[f] || ''}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required={['title', 'client'].includes(f)}
                />
              )
            )}

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Показатели</span>
                <button type="button" onClick={addMetric} className="text-xs text-admin-accent hover:underline">
                  + Добавить
                </button>
              </div>
              <p className="text-xs text-gray-500">Значение и подпись, как на странице кейса (например: 40% — Сокращение времени)</p>
              {(form.metrics || []).map((m, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    value={m.value || ''}
                    onChange={(e) => updateMetric(i, 'value', e.target.value)}
                    placeholder="Значение (40%)"
                    className="w-28 shrink-0 px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    value={m.label || ''}
                    onChange={(e) => updateMetric(i, 'label', e.target.value)}
                    placeholder="Подпись (Сокращение времени)"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button type="button" onClick={() => removeMetric(i)} className="text-red-500 text-sm px-1 shrink-0">
                    ✕
                  </button>
                </div>
              ))}
              {!(form.metrics || []).length && (
                <p className="text-xs text-gray-400 italic">Нет показателей — нажмите «+ Добавить»</p>
              )}
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Опубликован
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              На главной
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
