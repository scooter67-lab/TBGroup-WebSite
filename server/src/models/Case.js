import mongoose from 'mongoose';
import slugify from 'slugify';

const caseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    client: { type: String, required: true },
    industry: { type: String, default: '' },
    services: [{ type: String }],
    task: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    metrics: [{ label: String, value: String }],
    images: [{ type: String }],
    videoUrl: { type: String, default: '' },
    videoType: { type: String, enum: ['youtube', 'mp4', 'none'], default: 'none' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

caseSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true, locale: 'ru' });
  }
  next();
});

export default mongoose.model('Case', caseSchema);
