import express from "express";
import { createOrUpdateUser } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/firebaseAuth.js";

const router = express.Router();

router.post("/user", verifyFirebaseToken, createOrUpdateUser);

export default router;
