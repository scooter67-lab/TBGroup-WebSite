import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ProfileAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success(res.data.message);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Ошибка смены пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Профиль</h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <p className="text-sm text-gray-500 mb-1">Email</p>
        <p className="font-medium">{user?.email}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Изменить пароль</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Текущий пароль</span>
            <input
              type="password"
              {...register('currentPassword', { required: 'Введите текущий пароль' })}
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-admin-accent"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Новый пароль</span>
            <input
              type="password"
              {...register('newPassword', {
                required: 'Введите новый пароль',
                minLength: { value: 6, message: 'Минимум 6 символов' },
              })}
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-admin-accent"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Подтвердите новый пароль</span>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Подтвердите новый пароль',
                validate: (v) => v === newPassword || 'Пароли не совпадают',
              })}
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-admin-accent"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-admin-accent text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {loading ? 'Сохранение...' : 'Сохранить пароль'}
          </button>
        </form>
      </div>
    </div>
  );
}
