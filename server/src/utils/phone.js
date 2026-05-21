/**
 * Нормализация и проверка телефона (РФ и международный формат).
 */

/** Оставляет только цифры и ведущий + */
export const normalizePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  return hasPlus ? `+${digits}` : digits;
};

/** Минимум 10 цифр, максимум 15 (E.164) */
export const isValidPhone = (phone) => {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const digits = normalized.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};
