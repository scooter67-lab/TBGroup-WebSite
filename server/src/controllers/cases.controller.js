import Case from '../models/Case.js';

export const getCases = async (req, res) => {
  const { search, service, featured } = req.query;
  const filter = {};
  if (!req.user) filter.published = true;
  else if (req.query.all !== 'true') filter.published = true;

  if (featured === 'true') filter.featured = true;
  if (service) filter.services = service;
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { title: { $regex: escaped, $options: 'i' } },
      { client: { $regex: escaped, $options: 'i' } },
      { industry: { $regex: escaped, $options: 'i' } },
    ];
  }

  const cases = await Case.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(cases);
};

export const getCaseBySlug = async (req, res) => {
  const filter = { slug: req.params.slug };
  if (!req.user) filter.published = true;
  const caseItem = await Case.findOne(filter);
  if (!caseItem) return res.status(404).json({ message: 'Кейс не найден' });
  res.json(caseItem);
};

export const getCaseById = async (req, res) => {
  const caseItem = await Case.findById(req.params.id);
  if (!caseItem) return res.status(404).json({ message: 'Кейс не найден' });
  res.json(caseItem);
};

export const createCase = async (req, res) => {
  const caseItem = await Case.create(req.body);
  res.status(201).json(caseItem);
};

export const updateCase = async (req, res) => {
  const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!caseItem) return res.status(404).json({ message: 'Кейс не найден' });
  res.json(caseItem);
};

export const deleteCase = async (req, res) => {
  const caseItem = await Case.findByIdAndDelete(req.params.id);
  if (!caseItem) return res.status(404).json({ message: 'Кейс не найден' });
  res.json({ message: 'Кейс удалён' });
};
