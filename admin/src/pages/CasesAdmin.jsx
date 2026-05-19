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
  published: true,
  featured: false,
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
      if (form._id) await api.put(`/cases/${form._id}`, form);
      else await api.post('/cases', form);
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
          { key: 'published', label: 'Опубл.', render: (r) => (r.published ? '✓' : '—') },
        ]}
        rows={items}
        onEdit={setForm}
        onDelete={remove}
      />
      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={save} className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">{form._id ? 'Редактировать' : 'Новый кейс'}</h2>
            {['title', 'client', 'industry', 'task', 'solution', 'result'].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={form[f] || ''}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required={['title', 'client', 'task', 'solution', 'result'].includes(f)}
              />
            ))}
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Опубликован
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2 bg-admin-accent text-white rounded-lg">Сохранить</button>
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2 border rounded-lg">Отмена</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
