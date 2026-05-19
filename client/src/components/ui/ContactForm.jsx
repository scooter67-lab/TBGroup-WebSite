import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function ContactForm({ service = '', compact = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', { ...data, service });
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Ошибка отправки. Попробуйте позже.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
        <div>
          <label className="block text-sm font-medium mb-1">Имя *</label>
          <input
            {...register('name', { required: 'Укажите имя' })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-navy-light dark:bg-brand-navy-light focus:ring-2 focus:ring-brand-accent outline-none"
            placeholder="Ваше имя"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Телефон</label>
          <input
            {...register('phone')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-navy-light dark:bg-brand-navy-light focus:ring-2 focus:ring-brand-accent outline-none"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register('email', {
              pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' },
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-navy-light dark:bg-brand-navy-light focus:ring-2 focus:ring-brand-accent outline-none"
            placeholder="email@company.ru"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Компания</label>
          <input
            {...register('company')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-navy-light dark:bg-brand-navy-light focus:ring-2 focus:ring-brand-accent outline-none"
            placeholder="Название компании"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Сообщение</label>
        <textarea
          {...register('message')}
          rows={compact ? 3 : 4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-brand-navy-light dark:bg-brand-navy-light focus:ring-2 focus:ring-brand-accent outline-none resize-none"
          placeholder="Опишите задачу..."
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto disabled:opacity-60">
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}
