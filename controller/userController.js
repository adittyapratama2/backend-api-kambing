const { User } = require("../models");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // Exclude the password field
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAll = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
