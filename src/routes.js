const express = require("express");
const MovieController = require("./controllers/MovieController");
const UserController = require("./controllers/UserController");
const jwt = require("jsonwebtoken");
const routes = express.Router();

const User = require("./model/User");

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

// Private Route
routes.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //check if user exists
  const user = await User.findById(id, "-password");

  if (!user) {
    res.status(404).json({ message: "User not found!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
}

// Movies Routes
routes.get("/movie", MovieController.index);
routes.get("/movie/:_id", MovieController.detail);
routes.post("/movie", MovieController.store);
routes.delete("/movie/:_id", MovieController.delete);
routes.patch("/movie/:_id", MovieController.update);

// User Routes
routes.post("/auth/register", UserController.register);
routes.post("/auth/login", UserController.login);

module.exports = routes;
