import mongoose from 'mongoose';

const ALLOWED_CATEGORIES = [
  "Study Essentials",
  "Electronics & Gadgets",
  "Furniture & Room Items",
  "Clothing & Accessories",
  "Kitchen & Appliances",
  "Travel & Mobility",
  "Entertainment & Misc",
  "Others"
];

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  category: { type: String, enum: ALLOWED_CATEGORIES, required: true },
  image: String, // Store image URL or base64 string
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema); 