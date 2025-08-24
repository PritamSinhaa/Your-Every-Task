const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const db = require("./src/config/db");
const api = require("./src/routes/api");

const app = express();
const upload = multer();

db; // Connect to the database

app.use(express.json()); // Parser the json
app.use(cors());

app.use("/api", api);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
