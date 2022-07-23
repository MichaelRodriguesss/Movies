const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  title: String,
  thumb: String,
  rating: String,
  user_id: mongoose.Schema.Types.ObjectId,
});

const movies = mongoose.model("Movie", DataSchema);

module.exports = movies;
