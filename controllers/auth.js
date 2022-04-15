const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
const register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json("Please enter username, email & password ");
    }
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);

    // const newUser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hashedPassword,
    // });
    // const user = await newUser.save();

    // OR (both of these are same things)

    const user = await User.create({ ...req.body, password: hashedPassword });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login (POST)
const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json("Please enter username & password");
    }
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("Invalid credentials");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !isPasswordCorrect && res.status(401).json("Invalid credentials");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { register, login };
