const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const User = require("../model/user");

dotenv.config();

// import html file
const _dirname = path.resolve();
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
  let user;

  // Generate the random number
  const random = Math.floor(Math.random() * Math.pow(10, 6));
  const generateOTP = () => String(random).padEnd(6, 0);

  try {
    res = await User.findOne({ email });
    user = res.userName;
  } catch (err) {
    console.log("Something when wrong");
    return;
  }

  htmlContent = htmlContent
    .replace("{{username}}", user)
    .replace("{{otp}}", generateOTP());

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
