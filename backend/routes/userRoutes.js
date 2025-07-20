import express from "express";
import { createOrUpdateUser, getUserProfile } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/firebaseAuth.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createOrUpdateUser);
router.get("/user-profile", verifyFirebaseToken, getUserProfile);

export default router;
