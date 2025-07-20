import admin from "../firebase/firebaseConfig.js"; 
import User from "../models/User.js";

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Ensure uid and email are always present
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      ...decodedToken
    };
    // Attach MongoDB user _id for product creation
    const user = await User.findOne({ uid: decodedToken.uid });
    if (user) {
      req.user.mongoId = user._id;
    }
    next();
  } catch (error) {
    console.error("Firebase token error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;