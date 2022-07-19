const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./src/routes");

const app = express();

const mongodb = process.env.mongodb;

mongoose.connect(`${mongodb}`, async (err) => {
  if (err) throw err;
  console.log("conected with MongoDB");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(3003, () => {
  console.log("The Server is On");
});
