import { useState } from 'react';
import Modal from './Modal';

/**
 * Сетка сертификатов. В отличие от ImageGallery здесь object-contain:
 * документы разной ориентации, и вертикальные при обрезке под 16:9
 * превращались бы в полоску. Клик открывает документ целиком.
 */
export default function CertificateGallery({ items = [] }) {
  const [active, setActive] = useState(null);

  if (!items.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((cert) => (
          <button
            key={cert.image}
            type="button"
            onClick={() => setActive(cert)}
            className="group card-tb p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-magenta"
          >
            <div className="aspect-[3/4] rounded-lg bg-white overflow-hidden flex items-center justify-center">
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="mt-3 text-xs leading-snug text-tx2 dark:text-tx-inv2">{cert.title}</p>
          </button>
        ))}
      </div>
      <Modal isOpen={!!active} onClose={() => setActive(null)} title={active?.title} size="xl">
        {active && <img src={active.image} alt={active.title} className="w-full rounded-lg" />}
      </Modal>
    </>
  );
}
