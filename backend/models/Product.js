import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  image: String, // Store image URL or base64 string (use Cloudinary/S3 later)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming a User model exists
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema); 