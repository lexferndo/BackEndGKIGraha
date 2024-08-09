require("dotenv").config();
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    secret,
    { expiresIn: "3h" },
  );
};

module.exports = {
  generateToken,
};
