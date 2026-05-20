import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function ContactsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get('/contact')
      .then(({ data }) => setItems(data))
      .catch((err) => {
        setItems([]);
        toast.error(err.response?.data?.message || 'Не удалось загрузить заявки');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/contact/${id}`, { status });
      load();
    } catch {
      toast.error('Не удалось обновить статус');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Заявки</h1>
        <button type="button" onClick={load} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          Обновить
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Дата</th>
              <th className="px-4 py-3 text-left">Имя</th>
              <th className="px-4 py-3 text-left">Контакт</th>
              <th className="px-4 py-3 text-left">Компания</th>
              <th className="px-4 py-3 text-left">Услуга</th>
              <th className="px-4 py-3 text-left">Сообщение</th>
              <th className="px-4 py-3 text-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Загрузка…
                </td>
              </tr>
            )}
            {!loading &&
              items.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {new Date(r.createdAt).toLocaleString('ru-RU')}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">
                    {r.phone && <div>{r.phone}</div>}
                    {r.email && <div className="text-gray-500">{r.email}</div>}
                    {!r.phone && !r.email && '—'}
                  </td>
                  <td className="px-4 py-3">{r.company || '—'}</td>
                  <td className="px-4 py-3">{r.service || '—'}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={r.message}>
                    {r.message || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => setStatus(r._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="new">Новая</option>
                      <option value="processed">В работе</option>
                      <option value="closed">Закрыта</option>
                    </select>
                  </td>
                </tr>
              ))}
            {!loading && !items.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Заявок пока нет. Отправьте тестовую форму с сайта.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
