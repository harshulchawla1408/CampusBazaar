import User from '../models/User.js';

export const createOrUpdateUser = async (req, res) => {
  const { uid, email } = req.user;
  const { name, phone, age, department, year, hostelName, profileImage } = req.body;

  if (!name || !phone || !email || phone.length !== 10 || isNaN(Number(phone))) {
    return res.status(400).json({ message: 'Invalid or missing required fields.' });
  }
  if (age && age < 16) {
    return res.status(400).json({ message: 'Age must be at least 16.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      {
        email,
        name,
        phone,
        age,
        department,
        year,
        hostelName,
        profileImage,
      },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  const { uid, email } = req.user;
  try {
    const user = await User.findOne({ uid }) || await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
