const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Users = mongoose.model("User", DataSchema);

module.exports = Users;
