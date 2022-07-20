const express = require("express");
const MovieController = require("./controllers/MovieController");
const UserController = require("./controllers/UserController");
const routes = express.Router();
const User = require("./model/User");
const checkToken = require("./middlewares/checkToken");

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

// Private User Routes
routes.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //check if user exists
  const user = await User.findById(id, "-password");
  if (!user) {
    res.status(404).json({ message: "User not found!" });
  }

  res.status(200).json({ user });
});

// Movies Routes
routes.get("/movie", MovieController.index);
routes.get("/movie/:_id", MovieController.detail);
routes.post("/movie", checkToken, MovieController.store);
routes.delete("/movie/:_id", checkToken, MovieController.delete);
routes.patch("/movie/:_id", checkToken, MovieController.update);

// User Routes
routes.post("/auth/register", UserController.register);
routes.post("/auth/login", UserController.login);

module.exports = routes;
