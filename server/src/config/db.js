const mongoose = require("mongoose");
require("dotenv").config();

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "api",
    });

    console.log("Connected successfully.");
  } catch (err) {
    console.log("Database connection error!", err);
  }
};

module.exports = database;
