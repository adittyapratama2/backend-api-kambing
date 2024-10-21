const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Register user
exports.register = async (req, res) => {
  try {
    const { username, name, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    const userWithoutPassword = user.toJSON(); // Convert to a plain object
    delete userWithoutPassword.password; // Remove the password field
    res.json({ status: true, data: userWithoutPassword, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
