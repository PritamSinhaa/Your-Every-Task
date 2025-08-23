const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const upload = multer();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Can't be connect to database"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
