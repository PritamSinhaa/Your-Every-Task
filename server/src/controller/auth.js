const bcrypt = require("bcrypt");

const User = require("../model/user");

// Sign up controller

exports.signUp = async (req, res) => {
  const { signupUsername, signupEmail, signupPassword } = req.body;

  const hashPassword = await bcrypt.hash(signupPassword, 12);

  try {
    const newUser = new User({
      userName: signupUsername,
      email: signupEmail,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }

    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Sign in controller

exports.signIn = async (req, res) => {
  try {
    const { signinEmail, signinPassword } = req.body;

    const user = await User.findOne({ email: signinEmail });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const passwordMatch = await bcrypt.compare(signinPassword, user.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    return res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    res.status(500).json({ message: "Something when wrong! Try again later." });
  }
};
