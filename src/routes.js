const express = require("express");
const CrudController = require("./controllers/CrudController");
const UserController = require("./controllers/UserController");
const MoviesController = require("./controllers/MoviesController");
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

// CRUD Routes
routes.get("/movie", CrudController.index);
routes.get("/movie/:_id", CrudController.detail);
routes.post("/movie", checkToken, CrudController.store);
routes.delete("/movie/:_id", checkToken, CrudController.delete);
routes.patch("/movie/:_id", checkToken, CrudController.update);

// Movies Routes
routes.get("/movies", MoviesController.all);
routes.get("/movies/:id", MoviesController.show);
routes.get("/movies/search", MoviesController.search);

// User Routes
routes.post("/auth/register", UserController.register);
routes.post("/auth/login", UserController.login);
routes.post("/auth/:_id", UserController.movie);

module.exports = routes;
