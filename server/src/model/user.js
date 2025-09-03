const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema) || mongoose.model.User;

module.exports = User;
