import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

// GIF может быть анимированным, pdf и mp4 — не картинки: их не трогаем.
const OPTIMIZABLE = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_WIDTH = 1600;
const QUALITY = 82;

/**
 * Пережимает загруженную картинку в WebP и ограничивает ширину.
 * Снимок с телефона на 4 МБ превращается в файл на сотни килобайт.
 * Возвращает итоговое имя файла; при любой ошибке — исходное,
 * чтобы неудачная оптимизация не роняла саму загрузку.
 */
export const optimizeUpload = async (file) => {
  if (!file || !OPTIMIZABLE.has(file.mimetype)) return file?.filename;

  const dir = path.dirname(file.path);
  const base = path.basename(file.filename, path.extname(file.filename));
  // Через временный файл: у .webp на входе имя совпало бы с именем результата,
  // и sharp читал бы файл, который сам же перезаписывает.
  const tmpPath = path.join(dir, `${base}.tmp.webp`);
  const outName = `${base}.webp`;
  const outPath = path.join(dir, outName);

  try {
    await sharp(file.path)
      .rotate() // учесть EXIF-ориентацию, иначе фото с телефона ложится набок
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(tmpPath);

    await fs.unlink(file.path);
    await fs.rename(tmpPath, outPath);
    return outName;
  } catch (err) {
    console.error('[Upload] оптимизация не удалась, оставляем оригинал:', err.message);
    await fs.unlink(tmpPath).catch(() => {});
    return file.filename;
  }
};
