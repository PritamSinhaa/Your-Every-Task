const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const crypto = require("crypto");

const User = require("../model/user");

dotenv.config();

let user;

// import html file
const templatePath = path.join(
  __dirname,
  "..",
  "templates",
  "reset-password.html"
);
let htmlContent = fs.readFileSync(templatePath, "utf-8");

// Create mailgun auth
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  // Generate the random number
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    user = await User.findOne({ email });
    userName = user.userName;

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();
  } catch (err) {
    console.log("Something when wrong");
    return;
  }

  htmlContent = htmlContent
    .replace("{{username}}", userName)
    .replace("{{otp}}", otp);

  try {
    await transporter.sendMail({
      from: "noreply@yourdomain.com",
      to: email,
      subject: "Password Reset Request",
      text: `Hello ${user},`,
      html: htmlContent,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = await req.body;

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    } else {
      res.json({ message: "Verify otp successfully" });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
  } catch (err) {}
};
