const bcrypt = require("bcrypt");

const User = require("../model/user");

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

    req.session.userName = "Meshil";

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
        .json({ heading: "Erorr", message: "Wrong password" });

    req.session.userName = "Meshil";

    return res
      .status(201)
      .json({ heading: "Success", message: "Sign in successful" });
  } catch (error) {
    res.status(500).json({
      heading: "Error",
      message: "Something when wrong! Try again later.",
    });
  }
};
