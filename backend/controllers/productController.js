import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
      createdBy: req.user.id // from Firebase middleware
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