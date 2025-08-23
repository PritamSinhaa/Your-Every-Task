const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const upload = multer();

// Parser the json
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("From backend");
});

// Need to change later on
app.post("/api/auth", upload.none(), (req, res) => {
  const authData = req.body;

  res.send({ success: true });

  console.log(authData);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) =>
    console.log("Can't be connect to database, please check your database.")
  );

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
