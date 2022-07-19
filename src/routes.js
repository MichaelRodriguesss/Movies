const express = require("express");
const UsuarioController = require("./controllers/MovieController");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ message: "Back End with MongoDB" });
});

routes.get("/movie", UsuarioController.index);
routes.get("/movie/:_id", UsuarioController.detail);
routes.post("/movie", UsuarioController.store);
routes.delete("/movie/:_id", UsuarioController.delete);
routes.patch("/movie/:_id", UsuarioController.update);

module.exports = routes;
