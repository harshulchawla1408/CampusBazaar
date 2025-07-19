import express from 'express';
import { createProduct, getAllProducts } from '../controllers/productController.js';
import verifyFirebaseToken from '../middlewares/firebaseAuth.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, createProduct); // Only logged-in users
router.get('/', getAllProducts); // For homepage

export default router; 