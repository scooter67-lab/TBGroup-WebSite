import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  const filter = req.user && req.query.all === 'true' ? {} : { published: true };
  const services = await Service.find(filter).sort({ order: 1 });
  res.json(services);
};

export const getServiceBySlug = async (req, res) => {
  const filter = { slug: req.params.slug };
  if (!req.user) filter.published = true;
  const service = await Service.findOne(filter);
  if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
  res.json(service);
};

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
  res.json(service);
};

export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
  res.json({ message: 'Услуга удалена' });
};
