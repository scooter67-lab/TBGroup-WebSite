import Case from '../models/Case.js';
import Review from '../models/Review.js';
import ContactRequest from '../models/ContactRequest.js';
import Service from '../models/Service.js';

export const getDashboardStats = async (_req, res) => {
  const [cases, reviews, contacts, services, pendingReviews] = await Promise.all([
    Case.countDocuments(),
    Review.countDocuments({ published: true }),
    ContactRequest.countDocuments({ status: 'new' }),
    Service.countDocuments(),
    Review.countDocuments({ moderated: false }),
  ]);

  const recentContacts = await ContactRequest.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email phone status createdAt');

  res.json({
    stats: { cases, reviews, contacts, services, pendingReviews },
    recentContacts,
  });
};
