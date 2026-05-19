import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CrudTable from '../components/CrudTable';

export default function ServicesAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);

  const load = () => api.get('/services?all=true').then(({ data }) => setItems(data));
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (form._id) await api.put(`/services/${form._id}`, form);
      else await api.post('/services', form);
      toast.success('Сохранено');
      setForm(null);
      load();
    } catch {
      toast.error('Ошибка');
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Услуги</h1>
        <button type="button" onClick={() => setForm({ title: '', slug: '', shortDescription: '' })} className="px-4 py-2 bg-admin-accent text-white rounded-lg">
          + Добавить
        </button>
      </div>
      <CrudTable
        columns={[
          { key: 'title', label: 'Название' },
          { key: 'slug', label: 'Slug' },
        ]}
        rows={items}
        onEdit={setForm}
        onDelete={async (id) => {
          await api.delete(`/services/${id}`);
          load();
        }}
      />
      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={save} className="bg-white rounded-xl p-6 w-full max-w-md space-y-3">
            <input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название" className="w-full border px-3 py-2 rounded-lg" required />
            <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug" className="w-full border px-3 py-2 rounded-lg" />
            <textarea value={form.shortDescription || ''} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Описание" className="w-full border px-3 py-2 rounded-lg" rows={3} />
            <button type="submit" className="w-full py-2 bg-admin-accent text-white rounded-lg">Сохранить</button>
            <button type="button" onClick={() => setForm(null)} className="w-full py-2 border rounded-lg">Отмена</button>
          </form>
        </div>
      )}
    </div>
  );
}
