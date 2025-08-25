const User = require("../model/user");

exports.signUp = async (req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = new User({
      name,
      password,
    });

    await newUser.save();
    res.send("Successfull");
  } catch {
    console.log("Something went wrong!");
  }
};
