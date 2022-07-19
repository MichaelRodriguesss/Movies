const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const movies = mongoose.model("Movie", DataSchema);

module.exports = movies;
