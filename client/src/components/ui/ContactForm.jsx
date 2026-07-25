import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const phonePattern = /^[\d\s+()-]{10,20}$/;

/**
 * Форма заявки: только имя и телефон — остальное выясняет менеджер при звонке.
 * Поле service подставляется со страницы услуги и уходит в CRM вместе с заявкой.
 */
export default function ContactForm({ service = '', compact = false, onInk = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/lead', {
        name: data.name?.trim(),
        phone: data.phone?.trim(),
        service: service || '',
      });
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Ошибка отправки. Попробуйте позже.';
      toast.error(msg);
    }
  };

  const inputCls = `input-tb ${onInk ? '!bg-ink-4 !border-white/15 !text-tx-inv placeholder:!text-tx-inv3' : ''}`;
  const labelCls = `field-label ${onInk ? 'text-tx-inv' : ''}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-5'}>
        <div>
          <label className={labelCls}>Имя</label>
          <input
            {...register('name', { required: 'Укажите имя' })}
            className={`${inputCls} ${errors.name ? 'input-err' : ''}`}
            placeholder="Как к вам обращаться"
            autoComplete="name"
          />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Телефон</label>
          <input
            {...register('phone', {
              required: 'Укажите телефон',
              pattern: { value: phonePattern, message: 'Введите номер полностью — например, +7 700 123-45-67' },
            })}
            className={`${inputCls} ${errors.phone ? 'input-err' : ''}`}
            placeholder="+7 (___) ___-__-__"
            type="tel"
            autoComplete="tel"
          />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto">
        {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
      </button>
    </form>
  );
}
