import express from "express";
import { createOrUpdateUser, getUserProfile } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/firebaseAuth.js";

const router = express.Router();

router.post("/user", verifyFirebaseToken, createOrUpdateUser);
router.post('/create-or-update-user', verifyFirebaseToken, createOrUpdateUser);
router.get('/me', verifyFirebaseToken, getUserProfile);

export default router;
