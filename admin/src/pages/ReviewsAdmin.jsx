import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CrudTable from '../components/CrudTable';

export default function ReviewsAdmin() {
  const [items, setItems] = useState([]);

  const load = () => api.get('/reviews?all=true').then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const moderate = async (id, published = true) => {
    await api.patch(`/reviews/${id}/moderate`, { published });
    toast.success('Модерация обновлена');
    load();
  };

  const remove = async (id) => {
    if (!confirm('Удалить?')) return;
    await api.delete(`/reviews/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Отзывы</h1>
      <CrudTable
        columns={[
          { key: 'author', label: 'Автор' },
          { key: 'rating', label: 'Рейтинг' },
          { key: 'moderated', label: 'Модер.', render: (r) => (r.moderated ? '✓' : '⏳') },
        ]}
        rows={items}
        onEdit={() => {}}
        onDelete={remove}
        extraActions={(row) =>
          !row.moderated && (
            <button type="button" onClick={() => moderate(row._id)} className="text-green-600 text-xs">
              Одобрить
            </button>
          )
        }
      />
    </div>
  );
}
