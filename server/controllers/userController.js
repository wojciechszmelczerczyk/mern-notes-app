const User = require("../models/User.js");

const register = (req, res) => {
  const { email, password } = req.body;
  User.create({ email, password });
  res.send("user registered successfully");
};

const authenticate = (req, res) => {
  res.send("authenticate");
};

const getCurrentUser = (req, res) => {
  res.send("get current user");
};

const updateUser = (req, res) => {
  res.send("update current user");
};

module.exports = { register, authenticate, getCurrentUser, updateUser };
