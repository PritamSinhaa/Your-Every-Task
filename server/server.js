const express = require("express");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotevn = require("dotenv");

const api = require("./src/routes/api");
const mainRoutes = require("./src/routes/main-routes");
const database = require("./src/config/db");

const app = express();
const uplodad = multer();
dotevn.config();

database(); // Connect to the database

app.use(express.json()); // Parser the json
app.use(cors());
app.use(
  session({
    secret: "mySecreteKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "api",
    }),
  })
);

app.use("", uplodad.none(), mainRoutes);
app.use("/api", uplodad.none(), api);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
