import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/axios';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/stats/dashboard').then(({ data: d }) => setData(d)).catch(() => {});
  }, []);

  const stats = data?.stats || {};
  const cards = [
    { label: 'Кейсы', value: stats.cases || 0, color: 'bg-blue-500' },
    { label: 'Отзывы', value: stats.reviews || 0, color: 'bg-green-500' },
    { label: 'Новые заявки', value: stats.contacts || 0, color: 'bg-orange-500' },
    { label: 'На модерации', value: stats.pendingReviews || 0, color: 'bg-purple-500' },
  ];

  const chartData = [
    { name: 'Кейсы', count: stats.cases || 0 },
    { name: 'Отзывы', count: stats.reviews || 0 },
    { name: 'Услуги', count: stats.services || 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-3xl font-bold mt-1">{c.value}</p>
            <div className={`h-1 w-12 mt-3 rounded ${c.color}`} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 h-72">
          <h2 className="font-semibold mb-4">Статистика</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2D9CDB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Последние заявки</h2>
          <ul className="space-y-3">
            {(data?.recentContacts || []).map((r) => (
              <li key={r._id} className="flex justify-between text-sm border-b pb-2">
                <span>{r.name}</span>
                <span className="text-gray-400">{new Date(r.createdAt).toLocaleDateString('ru')}</span>
              </li>
            ))}
            {!data?.recentContacts?.length && <li className="text-gray-400">Нет заявок</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
