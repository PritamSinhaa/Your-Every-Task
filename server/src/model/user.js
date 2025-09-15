const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

const User = mongoose.model("User", UserSchema) || mongoose.model.User;

module.exports = User;
