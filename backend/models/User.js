import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  department: { type: String },
  year: { type: String },
  hostelName: { type: String },
  profileImage: { type: String }, // base64 or image URL
});

export default mongoose.model('User', userSchema);
