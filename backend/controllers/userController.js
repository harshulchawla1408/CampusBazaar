import User from "../models/User.js";

export const createOrUpdateUser = async (req, res) => {
  const { name, email, mobile } = req.body;
  const firebaseUid = req.user.uid;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  try {
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // ✅ Update user
      user.name = name;
      user.email = email;
      user.mobile = mobile;
      await user.save();
    } else {
      // ✅ Create user
      user = new User({
        firebaseUid,
        name,
        email,
        mobile,
      });
      await user.save();
    }

    res.status(200).json({ message: "User saved successfully", user });
  } catch (err) {
    console.error("User save error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
