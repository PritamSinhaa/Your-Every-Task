const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connect to database"))
  .catch((err) => console.log("Can't connect to database."));

module.exports = db;
