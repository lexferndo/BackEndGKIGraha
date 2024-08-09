require("dotenv").config();
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  const user = jwt.verify(token, secret);
  req.typeUser = user.role;
  next();
}

module.exports = {
  authToken,
};
