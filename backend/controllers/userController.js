const User = require("../models/User");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name ?? user.name;
    user.age = req.body.age ?? user.age;
    user.gender = req.body.gender ?? user.gender;
    user.bloodGroup =
      req.body.bloodGroup ?? user.bloodGroup;
    user.height =
      req.body.height ?? user.height;
    user.weight =
      req.body.weight ?? user.weight;
    user.emergencyContact =
      req.body.emergencyContact ??
      user.emergencyContact;
    user.medicalConditions =
      req.body.medicalConditions ??
      user.medicalConditions;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};