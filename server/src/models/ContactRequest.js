import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    company: { type: String, default: '' },
    message: { type: String, default: '' },
    service: { type: String, default: '' },
    source: { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'processed', 'closed'],
      default: 'new',
    },
    bitrixLeadId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('ContactRequest', contactRequestSchema);
