import Review from '../models/Review.js';

export const getReviews = async (req, res) => {
  const filter = req.user && req.query.all === 'true' ? {} : { published: true, moderated: true };
  const reviews = await Review.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(reviews);
};

export const createReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    published: false,
    moderated: false,
  });
  res.status(201).json({ message: 'Отзыв отправлен на модерацию', review });
};

export const createReviewAdmin = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
};

export const updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) return res.status(404).json({ message: 'Отзыв не найден' });
  res.json(review);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Отзыв не найден' });
  res.json({ message: 'Отзыв удалён' });
};

export const moderateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { moderated: true, published: req.body.published ?? true },
    { new: true }
  );
  if (!review) return res.status(404).json({ message: 'Отзыв не найден' });
  res.json(review);
};
