import Product from '../models/Product.js';

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

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    if (!req.user.mongoId) {
      return res.status(401).json({ error: 'User not authenticated or not found.' });
    }
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category.' });
    }
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
      createdBy: req.user.mongoId
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 