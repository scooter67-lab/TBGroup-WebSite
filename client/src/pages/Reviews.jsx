import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import VideoEmbed from '../components/ui/VideoEmbed';
import { PixelCluster } from '../components/ui/Decor';
import { Rating } from '../components/home/ReviewsPreview';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    api.get('/reviews').then(({ data }) => setReviews(data)).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/reviews', { ...data, rating: Number(data.rating), type: 'text' });
      toast.success('Спасибо! Отзыв появится после модерации.');
      reset();
    } catch {
      toast.error('Не получилось отправить. Попробуйте ещё раз.');
    }
  };

  const textReviews = reviews.filter((r) => r.type === 'text' && r.text);
  const videoReviews = reviews.filter((r) => (r.type === 'youtube' || r.type === 'mp4') && r.videoUrl);
  const isEmpty = reviews.length === 0;

  return (
    <>
      <SEO title="Отзывы" description="Отзывы клиентов TB Group о внедрении МойСклад, Битрикс24 и IP-телефонии в Казахстане." path="/reviews" />
      <section className="section-pad">
        <div className="container-tb">
          <Breadcrumbs items={[{ label: 'Отзывы' }]} />
          <p className="eyebrow mb-4">Нам доверяют</p>
          <h1 className="heading-1 mb-10">Отзывы клиентов</h1>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
            <div>
              {isEmpty ? (
                <div className="text-center border-[1.5px] border-dashed border-paper-line2 dark:border-white/15 rounded-2xl px-8 py-14">
                  <PixelCluster size={52} className="mx-auto mb-5" />
                  <h2 className="font-bold text-lg mb-2">Отзывы скоро появятся</h2>
                  <p className="text-sm text-tx2 dark:text-tx-inv2 max-w-sm mx-auto">
                    Мы собираем отклики клиентов. Работали с нами? Поделитесь опытом в форме
                    справа — это займёт две минуты.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {videoReviews.map((r) => (
                    <div key={r._id} className="card-tb p-4 sm:col-span-2">
                      <VideoEmbed url={r.videoUrl} type={r.type === 'mp4' ? 'mp4' : 'youtube'} />
                      <p className="font-semibold text-sm mt-3">{r.author}</p>
                      {r.company && <p className="text-[13px] text-tx3 dark:text-tx-inv3">{r.company}</p>}
                    </div>
                  ))}
                  {textReviews.map((r) => (
                    <div key={r._id} className="card-tb p-6">
                      <Rating value={r.rating || 5} className="mb-4" />
                      <p className="text-[15px] text-tx2 dark:text-tx-inv2 mb-5">&ldquo;{r.text}&rdquo;</p>
                      <p className="font-semibold text-sm">{r.author}</p>
                      {r.company && <p className="text-[13px] text-tx3 dark:text-tx-inv3">{r.company}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card-tb p-7 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold mb-5">Оставить отзыв</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('author', { required: true })} placeholder="Ваше имя" className="input-tb" />
                <input {...register('company')} placeholder="Компания" className="input-tb" />
                <textarea {...register('text', { required: true })} placeholder="Что было сделано и как это повлияло на бизнес" rows={4} className="input-tb resize-none" />
                <select {...register('rating')} className="input-tb">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>Оценка: {n} из 5</option>
                  ))}
                </select>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  {isSubmitting ? 'Отправка…' : 'Отправить'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
