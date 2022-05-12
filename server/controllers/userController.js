const User = require("../models/User.js");
const createToken = require("../token/createToken.js");
const extractIdFromToken = require("../token/extractId.js");

const register = async (req, res) => {
  let { email, password, jwt = "" } = req.body;

  // create new user with empty jwt
  const newUser = await User.create({ email, password, jwt });

  // save jwt in created user
  const userWithJwt = await User.findByIdAndUpdate(newUser._id, {
    jwt: createToken(newUser.uuid),
  });
  res.send(userWithJwt);
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    // compare input data and data from database
    const user = await User.login(email, password);

    // retrieve user jwt
    const token = user.jwt;

    // populate cookie with jwt
    res.cookie("jwt", token, {
      httpOnly: true,
      expiresIn: process.env.JWT_EXPIRATION * 1000,
    });

    // return jwt
    res.json({ token });
  } catch (err) {
    res.json({ error: err.message });
    return err;
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.json("jwt deleted");
};

const getCurrentUser = async (req, res) => {
  const cookie = req.headers.cookie.slice(4);

  const { id } = extractIdFromToken(cookie);

  const currentUser = await User.findOne({ uuid: id });

  res.json(currentUser);
};

const updateUser = async (req, res) => {
  const { email } = req.body;

  const cookie = req.headers.cookie.slice(4);

  const { id } = extractIdFromToken(cookie);

  const updatedUser = await User.findOneAndUpdate({ uuid: id }, { email });

  res.json({ updated_user: updatedUser });
};

module.exports = { register, authenticate, logout, getCurrentUser, updateUser };
