const bcrypt = require("bcrypt");

const User = require("../model/user");

exports.signUp = async (req, res) => {
  const { name, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new User({ name, password: hashPassword });
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
