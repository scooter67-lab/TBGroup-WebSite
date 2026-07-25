import { optimizeUpload } from '../utils/optimizeImage.js';

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }
  const filename = await optimizeUpload(req.file);
  res.json({ url: `/uploads/${filename}`, filename });
};

export const uploadMultiple = async (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ message: 'Файлы не загружены' });
  }
  const files = await Promise.all(
    req.files.map(async (f) => {
      const filename = await optimizeUpload(f);
      return { url: `/uploads/${filename}`, filename };
    })
  );
  res.json({ files });
};
