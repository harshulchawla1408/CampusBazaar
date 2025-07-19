import User from '../models/User.js';

export const createOrUpdateUser = async (req, res) => {
  const { uid, email, name, picture } = req.user;
  // All dashboard fields from body
  const {
    displayName,
    photoURL,
    roll,
    phone,
    age,
    gender,
    department,
    branch,
    year,
    semester
  } = req.body;

  try {
    console.log('createOrUpdateUser req.user:', req.user);
    console.log('createOrUpdateUser req.body:', req.body);
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        email,
        displayName: displayName || name || '',
        photoURL: photoURL || picture || '',
        roll: roll || '',
        phone: phone || '',
        age: age || '',
        gender: gender || '',
        department: department || '',
        branch: branch || '',
        year: year || '',
        semester: semester || '',
      },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (err) {
    console.error('createOrUpdateUser error:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

export const getUserProfile = async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
