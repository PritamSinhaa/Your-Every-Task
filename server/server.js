const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const api = require("./src/routes/api");
const database = require("./src/config/db");

const app = express();
const uplodad = multer();

database(); // Connect to the database

app.use(express.json()); // Parser the json
app.use(cors());

app.get("/", (req, res, next) => res.send("Home page"));
app.use("/api", uplodad.none(), api);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
