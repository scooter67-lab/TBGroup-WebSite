import { useState } from 'react';
import Modal from './Modal';

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(null);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(img)}
            className="rounded-xl overflow-hidden aspect-video focus:ring-2 focus:ring-brand-accent"
          >
            <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </button>
        ))}
      </div>
      <Modal isOpen={!!active} onClose={() => setActive(null)} size="xl">
        {active && <img src={active} alt="" className="w-full rounded-lg" />}
      </Modal>
    </>
  );
}
