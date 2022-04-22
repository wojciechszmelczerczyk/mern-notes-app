const User = require("../models/User.js");
const createToken = require("../token/createToken.js");
const { dbConnection, closeDbConnection } = require("../db/connection");

const register = async (req, res) => {
  await dbConnection();

  let { email, password, jwt = "" } = req.body;

  // create new user with empty jwt
  const newUser = await User.create({ email, password, jwt });

  // save jwt in created user
  const userWithJwt = await User.findByIdAndUpdate(newUser._id, {
    jwt: createToken(newUser.uuid),
  });
  res.send(userWithJwt);

  await closeDbConnection();
};

const authenticate = async (req, res) => {
  await dbConnection();

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
  await closeDbConnection();
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.send("jwt deleted");
};

const getCurrentUser = (req, res) => {
  res.send("get current user");
};

const updateUser = (req, res) => {
  res.send("update current user");
};

module.exports = { register, authenticate, logout, getCurrentUser, updateUser };
