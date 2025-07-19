import admin from "../firebase/firebaseConfig.js"; 
import User from "../models/User.js";

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase token error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;