const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotevn = require("dotenv");

dotevn.config();

const User = require("../model/user");

// Create reusable transporter for Mailgun SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465, // TLS
  auth: {
    user: process.env.MAILGUN_USER, // Mailgun SMTP login
    pass: process.env.MAILGUN_PASS, // Mailgun SMTP password
  },
});

// Sign up controller
exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new User({
      userName: username,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    // Send welcome email with Mailgun + Nodemailer
    try {
      await transporter.sendMail({
        from: "noreply@yourdomain.com",
        to: email,
        subject: "Welcome to Your Every Task 🎉",
        text: `Hello ${username},\n\nThank you for signing up!`,
        html: `<p>Hello <b>${username}</b>,</p><p>Thank you for signing up!</p>
        <p> Be productive. 😎`,
      });
    } catch (mailError) {
      console.error("Mailgun error:", mailError.message);
    }

    res.status(201).json({ heading: "Success", message: "Signup successful!" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ heading: "Error", message: "Email already exists!" });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ heading: "Error", message: errors.join(", ") });
    }

    res
      .status(500)
      .json({ heading: "Error", message: "Something went wrong!" });
  }
};

// Sign in controller
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ heading: "Error", message: "User not found!" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(400)
        .json({ heading: "Error", message: "Wrong password" });

    req.session.isLogin = true;

    return res
      .status(201)
      .json({ heading: "Success", message: "Sign in successful" });
  } catch (error) {
    res.status(500).json({
      heading: "Error",
      message: "Something went wrong! Try again later.",
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    console.log(newPassword);
  } catch {}
};
