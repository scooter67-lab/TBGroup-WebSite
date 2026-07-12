import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const phonePattern = /^[\d\s+()-]{10,20}$/;

export default function ContactForm({ service = '', compact = false, onInk = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const phone = data.phone?.trim();
    const email = data.email?.trim();

    if (!phone && !email) {
      toast.error('Укажите телефон или email');
      return;
    }

    try {
      await api.post('/lead', {
        name: data.name?.trim(),
        phone: phone || undefined,
        email: email || undefined,
        message: data.message?.trim() || '',
        company: data.company?.trim() || '',
        service: service || data.service?.trim() || '',
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
  const labelCls = `block text-[13px] font-semibold mb-1.5 ${onInk ? 'text-tx-inv' : ''}`;
  const hintCls = `text-xs ${onInk ? 'text-tx-inv3' : 'text-tx3 dark:text-tx-inv3'}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
        <div>
          <label className={labelCls}>Имя *</label>
          <input
            {...register('name', { required: 'Укажите имя' })}
            className={`${inputCls} ${errors.name ? 'input-err' : ''}`}
            placeholder="Как к вам обращаться"
          />
          {errors.name && <p className="text-[#E5484D] text-[12.5px] mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Телефон</label>
          <input
            {...register('phone', {
              pattern: { value: phonePattern, message: 'Введите номер полностью — например, +7 700 123-45-67' },
            })}
            className={`${inputCls} ${errors.phone ? 'input-err' : ''}`}
            placeholder="+7 (___) ___-__-__"
          />
          {errors.phone && <p className="text-[#E5484D] text-[12.5px] mt-1.5">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input
            {...register('email', {
              pattern: { value: /^\S+@\S+\.\S+$/i, message: 'Проверьте адрес — например, name@company.kz' },
            })}
            className={`${inputCls} ${errors.email ? 'input-err' : ''}`}
            placeholder="name@company.kz"
          />
          {errors.email && <p className="text-[#E5484D] text-[12.5px] mt-1.5">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Компания</label>
          <input {...register('company')} className={inputCls} placeholder="Название компании" />
        </div>
      </div>
      <p className={hintCls}>* Имя обязательно. Укажите телефон или email.</p>
      <div>
        <label className={labelCls}>Сообщение</label>
        <textarea
          {...register('message')}
          rows={compact ? 3 : 4}
          className={`${inputCls} resize-none`}
          placeholder="Опишите процесс, который хотите автоматизировать"
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto">
        {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
      </button>
    </form>
  );
}
