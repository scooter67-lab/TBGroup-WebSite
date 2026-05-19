import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import VideoEmbed from '../components/ui/VideoEmbed';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    api.get('/reviews').then(({ data }) => setReviews(data)).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/reviews', { ...data, rating: Number(data.rating), type: 'text' });
      toast.success('Отзыв отправлен на модерацию');
      reset();
    } catch {
      toast.error('Ошибка отправки');
    }
  };

  const featured = reviews.filter((r) => r.type !== 'text' || r.text);
  const current = featured[index];

  return (
    <>
      <SEO title="Отзывы" description="Отзывы клиентов TB Group" path="/reviews" />
      <section className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: 'Отзывы' }]} />
          <h1 className="heading-1 mb-10">Отзывы клиентов</h1>

          {featured.length > 0 && (
            <div className="mb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current?._id || index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center"
                >
                  {current?.type === 'text' && (
                    <>
                      <div className="text-yellow-400 mb-4">{'★'.repeat(current.rating || 5)}</div>
                      <p className="text-xl mb-6">&ldquo;{current.text}&rdquo;</p>
                      <p className="font-bold">{current.author}</p>
                      <p className="text-brand-muted">{current.company}</p>
                    </>
                  )}
                  {(current?.type === 'youtube' || current?.type === 'mp4') && current.videoUrl && (
                    <VideoEmbed url={current.videoUrl} type={current.type === 'mp4' ? 'mp4' : 'youtube'} />
                  )}
                </motion.div>
              </AnimatePresence>
              <motion.div className="flex justify-center gap-4 mt-6">
                <button type="button" onClick={() => setIndex((i) => (i - 1 + featured.length) % featured.length)} className="btn-outline py-2 px-4">←</button>
                <span className="py-2">{index + 1} / {featured.length}</span>
                <button type="button" onClick={() => setIndex((i) => (i + 1) % featured.length)} className="btn-outline py-2 px-4">→</button>
              </motion.div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {reviews.map((r) => (
              <div key={r._id} className="glass rounded-xl p-5">
                <div className="text-yellow-400 text-sm mb-2">{'★'.repeat(r.rating || 5)}</div>
                <p className="text-sm line-clamp-4">{r.text}</p>
                <p className="font-medium mt-3 text-sm">{r.author}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto glass rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">Оставить отзыв</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register('author', { required: true })} placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl border dark:bg-brand-navy-light" />
              <input {...register('company')} placeholder="Компания" className="w-full px-4 py-3 rounded-xl border dark:bg-brand-navy-light" />
              <textarea {...register('text', { required: true })} placeholder="Отзыв" rows={4} className="w-full px-4 py-3 rounded-xl border dark:bg-brand-navy-light" />
              <select {...register('rating')} className="w-full px-4 py-3 rounded-xl border dark:bg-brand-navy-light">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} звёзд</option>
                ))}
              </select>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Отправить</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
