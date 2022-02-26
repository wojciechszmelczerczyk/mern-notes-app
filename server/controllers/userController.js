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

const getCurrentUser = (req, res) => {
  res.send("get current user");
};

const updateUser = (req, res) => {
  res.send("update current user");
};

module.exports = { register, authenticate, getCurrentUser, updateUser };
