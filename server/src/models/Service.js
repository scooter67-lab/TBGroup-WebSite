import mongoose from 'mongoose';
import slugify from 'slugify';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'cloud' },
    benefits: [{ title: String, description: String }],
    steps: [{ title: String, description: String }],
    faq: [{ question: String, answer: String }],
    gallery: [{ type: String }],
    heroImage: { type: String, default: '' },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

serviceSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true, locale: 'ru' });
  }
  next();
});

export default mongoose.model('Service', serviceSchema);
