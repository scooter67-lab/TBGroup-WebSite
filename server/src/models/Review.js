import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    text: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    type: { type: String, enum: ['text', 'youtube', 'mp4'], default: 'text' },
    videoUrl: { type: String, default: '' },
    avatar: { type: String, default: '' },
    published: { type: Boolean, default: false },
    moderated: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
