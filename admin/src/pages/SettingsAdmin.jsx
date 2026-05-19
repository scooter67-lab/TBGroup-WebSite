import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function SettingsAdmin() {
  const [contacts, setContacts] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      const map = {};
      data.settings?.forEach((s) => {
        map[s.key] = s.value;
      });
      setContacts(map.contacts || {});
      setStats(map.stats || {});
    });
  }, []);

  const save = async (key, value) => {
    await api.put('/settings', { key, value });
    toast.success('Сохранено');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold mb-4">Контакты</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {['phone', 'email', 'address', 'telegram', 'whatsapp'].map((f) => (
            <input
              key={f}
              value={contacts[f] || ''}
              onChange={(e) => setContacts({ ...contacts, [f]: e.target.value })}
              placeholder={f}
              className="border px-3 py-2 rounded-lg"
            />
          ))}
        </div>
        <button type="button" onClick={() => save('contacts', contacts)} className="mt-4 px-4 py-2 bg-admin-accent text-white rounded-lg">
          Сохранить контакты
        </button>
      </section>
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Статистика на главной</h2>
        <div className="grid grid-cols-2 gap-3">
          {['projects', 'clients', 'years', 'integrations'].map((f) => (
            <input
              key={f}
              type="number"
              value={stats[f] || ''}
              onChange={(e) => setStats({ ...stats, [f]: Number(e.target.value) })}
              placeholder={f}
              className="border px-3 py-2 rounded-lg"
            />
          ))}
        </div>
        <button type="button" onClick={() => save('stats', stats)} className="mt-4 px-4 py-2 bg-admin-accent text-white rounded-lg">
          Сохранить статистику
        </button>
      </section>
    </div>
  );
}
