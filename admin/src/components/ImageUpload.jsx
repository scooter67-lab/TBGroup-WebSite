import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

// Что принимает сервер (upload.middleware.js): расширение И mime из белого списка.
const ACCEPT = '.jpg,.jpeg,.png,.webp,.gif';

// Хост админки отдаёт SPA на любой неизвестный путь, поэтому картинки из
// статики сайта (/team, /office.webp, /certificates) здесь превращаются
// в index.html. Показываем их с адреса сайта; /uploads проксируется на оба
// хоста и работает как есть.
const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

export const previewSrc = (value) => {
  if (!value) return '';
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/uploads')) return value;
  return value.startsWith('/') ? `${SITE_URL}${value}` : value;
};

/**
 * Загрузка картинки на сервер с превью. Отдаёт наверх путь вида /uploads/<файл>.
 * Content-Type для FormData не ставим — axios сам проставит boundary.
 */
export default function ImageUpload({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file) => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    setBusy(true);
    try {
      const { data } = await api.post('/upload', form);
      onChange(data.url);
      toast.success('Файл загружен');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Не удалось загрузить файл');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="text-sm">
      <span className="text-gray-600 mb-1 block">{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          <img src={previewSrc(value)} alt="" className="w-16 h-16 rounded-lg object-cover border shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-lg border border-dashed flex items-center justify-center text-gray-400 text-xs shrink-0">
            нет фото
          </div>
        )}
        <div className="min-w-0 space-y-1">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            disabled={busy}
            onChange={(e) => upload(e.target.files?.[0])}
            className="text-xs max-w-full"
          />
          {busy && <p className="text-xs text-gray-500">Загрузка…</p>}
          {value && !busy && (
            <button type="button" onClick={() => onChange('')} className="text-xs text-red-500 block">
              Убрать фото
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
