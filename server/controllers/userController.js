require("dotenv").config();
const User = require("../models/User.js");
const createToken = require("../token/createToken.js");
const extractIdFromToken = require("../token/extractId.js");

const register = async (req, res) => {
  let { email, password, jwt = "" } = req.body;
  let errors;
  try {
    // create new user
    const newUser = await User.create({ email, password, jwt });
    // return new user
    res.json(newUser);
  } catch (err) {
    errors = err.message.split(", ");
    // return register errors
    res.status(400).json({ errors });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    // compare input data and data from database
    const user = await User.login(email, password);

    // retrieve user jwt
    const token = createToken(user._id);

    // update jwt in databsae with new token
    await User.findOneAndUpdate({ email }, { jwt: token });

    // populate cookie with jwt
    res.cookie("jwt", token, {
      httpOnly: true,
      expiresIn: process.env.JWT_EXPIRATION * 1000,
    });

    // return jwt
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
    return err;
  }
};

const logout = async (req, res) => {
  const token = req.headers.cookie.slice(4);
  const { id } = extractIdFromToken(token);

  // reset cookie
  res.cookie("jwt", "", {
    maxAge: 1,
  });

  // reset jwt in db
  await User.findOneAndUpdate({ _id: id }, { jwt: "" });

  res.status(200).json({ jwt: "token deleted" });
};

const getCurrentUser = async (req, res) => {
  const token = req.headers.cookie.slice(4);
  const { id } = extractIdFromToken(token);

  const currentUser = await User.findOne({ _id: id });

  res.status(200).json(currentUser);
};

const updateUser = async (req, res) => {
  const { email } = req.body;

  const cookie = req.headers.cookie.slice(4);

  const { id } = extractIdFromToken(cookie);

  const updatedUser = await User.findOneAndUpdate({ _id: id }, { email });

  res.status(201).json({ updated_user: updatedUser });
};

module.exports = { register, authenticate, logout, getCurrentUser, updateUser };
