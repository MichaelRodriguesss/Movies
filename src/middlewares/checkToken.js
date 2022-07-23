const jwt = require("jsonwebtoken");
const Users = require("../model/User");

async function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const secret = process.env.SECRET;

    const decryptedToken = jwt.verify(token, secret);
    const user = await Users.findById(decryptedToken.id, "-password");
    req.session = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
}

module.exports = checkToken;
