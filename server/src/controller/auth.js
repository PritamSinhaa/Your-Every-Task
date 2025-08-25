const bcrypt = require("bcrypt");

const User = require("../model/user");

exports.signUp = async (req, res) => {
  const { name, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new User({
      name,
      hashPassword,
    });

    await newUser.save();

    res.status(201).json({ okay: "Sign up successfully" });
  } catch {
    console.log("Something went wrong!");
  }
};
