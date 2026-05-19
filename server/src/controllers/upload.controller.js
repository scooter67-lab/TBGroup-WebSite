export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
};

export const uploadMultiple = async (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ message: 'Файлы не загружены' });
  }
  const files = req.files.map((f) => ({
    url: `/uploads/${f.filename}`,
    filename: f.filename,
  }));
  res.json({ files });
};
