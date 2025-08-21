const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Can't be connect to database"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
