const User = require("../models/User.js");

const createToken = require("../token/createToken.js");

const register = async (req, res) => {
  let { email, password, jwt = "" } = req.body;

  // create new user with empty jwt
  const newUser = await User.create({ email, password, jwt });

  // save jwt in created user
  const userWithJwt = await User.findByIdAndUpdate(newUser._id, {
    jwt: createToken(newUser._id),
  });
  res.send(userWithJwt);
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
