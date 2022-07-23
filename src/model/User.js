const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  movies: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      title: {
        type: String,
      },
      thumb: {
        type: String,
      },
      rating: {
        type: String,
      },
    },
  ],
});

const Users = mongoose.model("User", DataSchema);

module.exports = Users;
