import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ContactsAdmin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/contact').then(({ data }) => setItems(data));
  }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/contact/${id}`, { status });
    const { data } = await api.get('/contact');
    setItems(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Заявки</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Имя</th>
              <th className="px-4 py-3 text-left">Контакт</th>
              <th className="px-4 py-3 text-left">Услуга</th>
              <th className="px-4 py-3 text-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.phone || r.email}</td>
                <td className="px-4 py-3">{r.service || '—'}</td>
                <td className="px-4 py-3">
                  <select value={r.status} onChange={(e) => setStatus(r._id, e.target.value)} className="border rounded px-2 py-1">
                    <option value="new">Новая</option>
                    <option value="processed">В работе</option>
                    <option value="closed">Закрыта</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
