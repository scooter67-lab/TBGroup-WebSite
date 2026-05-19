import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function BannersAdmin() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title: '', subtitle: '', placement: 'hero', active: true });

  const load = () => api.get('/settings/banners').then(({ data }) => setBanners(data));
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/settings/banners', form);
    toast.success('Баннер создан');
    setForm({ title: '', subtitle: '', placement: 'hero', active: true });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/settings/banners/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Баннеры</h1>
      <form onSubmit={save} className="bg-white rounded-xl shadow p-6 mb-6 grid md:grid-cols-2 gap-4">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Заголовок" className="border px-3 py-2 rounded-lg" required />
        <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Подзаголовок" className="border px-3 py-2 rounded-lg" />
        <button type="submit" className="md:col-span-2 py-2 bg-admin-accent text-white rounded-lg">Добавить баннер</button>
      </form>
      <ul className="space-y-2">
        {banners.map((b) => (
          <li key={b._id} className="bg-white rounded-lg shadow px-4 py-3 flex justify-between">
            <span>{b.title} — {b.placement}</span>
            <button type="button" onClick={() => remove(b._id)} className="text-red-500 text-sm">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
