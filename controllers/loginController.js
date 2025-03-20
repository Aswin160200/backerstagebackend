const jwt = require("jsonwebtoken");
const User = require("../models/loginModel");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login request received:", { username, password });

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await User.getByUsername(username);
    console.log("User found in DB:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.userid, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginUser };
