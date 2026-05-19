import Settings from '../models/Settings.js';
import Banner from '../models/Banner.js';

export const getPublicSettings = async (_req, res) => {
  const settings = await Settings.find({
    key: { $in: ['contacts', 'stats', 'seo', 'social'] },
  });
  const result = {};
  settings.forEach((s) => {
    result[s.key] = s.value;
  });
  res.json(result);
};

export const getAllSettings = async (_req, res) => {
  const settings = await Settings.find();
  const banners = await Banner.find().sort({ order: 1 });
  res.json({ settings, banners });
};

export const upsertSetting = async (req, res) => {
  const { key, value } = req.body;
  const setting = await Settings.findOneAndUpdate(
    { key },
    { value },
    { new: true, upsert: true }
  );
  res.json(setting);
};

export const getBanners = async (req, res) => {
  const filter = req.user ? {} : { active: true };
  const banners = await Banner.find(filter).sort({ order: 1 });
  res.json(banners);
};

export const createBanner = async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json(banner);
};

export const updateBanner = async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!banner) return res.status(404).json({ message: 'Баннер не найден' });
  res.json(banner);
};

export const deleteBanner = async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  if (!banner) return res.status(404).json({ message: 'Баннер не найден' });
  res.json({ message: 'Баннер удалён' });
};
