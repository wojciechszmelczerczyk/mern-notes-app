require("dotenv").config();
const User = require("../models/User.js");
const createToken = require("../token/createToken.js");
const { verify } = require("jsonwebtoken");

const register = async (req, res) => {
  let { email, password, refreshToken = "" } = req.body;
  let errors;
  try {
    // create new user
    const newUser = await User.create({ email, password, refreshToken });
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

    // create refresh token
    const refreshToken = createToken(
      user._id,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXP
    );

    // create access token
    const accessToken = createToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXP
    );

    // update jwt in database with new refresh token
    await User.findOneAndUpdate({ email }, { refreshToken });

    // // populate cookie with jwt
    res
      .cookie("jwt", accessToken, {
        httpOnly: true,
      })
      .cookie("rt", refreshToken, {
        httpOnly: true,
        path: process.env.REFRESH_TOKEN_SCOPE,
      })
      .status(201)
      .json({ accessToken, refreshToken });

    // return jwt
  } catch (err) {
    res.status(400).json({ error: err.message });
    return err;
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.rt;

    if (refreshToken === undefined) return res.json("token doesn't exist");

    const { id } = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    let jwt = createToken(
      id,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXP
    );

    res.cookie("jwt", jwt, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP * 100,
    });

    res.json({ accessToken: jwt, refreshToken });
  } catch (err) {
    res.json({
      fail: true,
      err: err.message,
    });
  }
};

const logout = async (req, res) => {
  const id = req.user.id;

  // reset cookie
  res.cookie("jwt", "", {
    maxAge: 1,
  });

  // invalidate RT in db
  await User.findOneAndUpdate({ _id: id }, { refreshToken: "" });

  res.status(200).json({ rt_invalidate: "rt deleted" });
};

const getCurrentUser = async (req, res) => {
  const id = req.user.id;

  const currentUser = await User.findOne({ _id: id });

  res.status(200).json(currentUser);
};

const updateUser = async (req, res) => {
  const { email } = req.body;

  const id = req.user.id;

  const updatedUser = await User.findOneAndUpdate({ _id: id }, { email });

  res.status(201).json({ updated_user: updatedUser });
};

module.exports = {
  register,
  authenticate,
  refreshToken,
  logout,
  getCurrentUser,
  updateUser,
};
