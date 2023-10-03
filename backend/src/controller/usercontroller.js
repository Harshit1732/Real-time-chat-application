const User = require("../models/usermodel");
const generatetoken = require("../config/generatetoken");

const createuser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await User.findOne({ email: email });
    if (result) {
      return res.status(200).json({ message: "user already exists" });
    }
    const user = await User.create({
      Name: name,
      email,
      password,
    });
    user.save();

    // console.log(generatetoken(user._id));
    if (user) {
      res.status(200).json({
        user: user,
        token: await generatetoken(user._id),
      });
    } else {
      res.status(500);
    }
  } catch (err) {
    res.status(500).json({ message: "error creating user" });
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: user,
      token: await generatetoken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "error found user" });
  }
};

const getAllusers = async (req, res) => {
  // const userid= req.user._id;
  const loggedInUserId = req.user._id;
  try {
    const users = await User.find({ _id: { $ne: loggedInUserId } });
    return res.status(200).json({ user: users });
  } catch (err) {
    res.status(500).json({ message: "error while getting users" });
  }
};

const searchUser = async (req, res) => {
  const name = req.query.search;

  const user = await User.find({ name });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user: user });
};
module.exports = { createuser, login, getAllusers, searchUser };
