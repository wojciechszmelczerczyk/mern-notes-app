import { config } from "dotenv";

config();

import createToken from "../token/createToken";

import { verify } from "jsonwebtoken";
import User from "../models/User";
import { JWT } from "../types/Jwt";

const register = async (req, res) => {
  let { email, password, refreshToken = "" } = req.body;
  try {
    // create new user
    const newUser = await User.create({ email, password, refreshToken });
    // return new user
    res.json(newUser);
  } catch (err) {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    res.json({ fail: true, errors });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    // compare input data and data from database
    const user: any = await User.login(email, password);

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

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.json({ fail: true, err: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const rt = authHeader && authHeader.split(" ")[1];

    if (rt === undefined) throw new Error("rt doesn't exist");

    const { id } = verify(rt, process.env.REFRESH_TOKEN_SECRET) as JWT;

    let jwt = createToken(
      id,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXP
    );

    res.json({ accessToken: jwt, refreshToken: rt });
  } catch (err) {
    res.status(400).json({
      fail: true,
      err: err.message,
    });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ rtInvalidate: "rt deleted" });
};

const getCurrentUser = async (req, res) => {
  const id = req.user.id;

  const currentUser = await User.findOne({ _id: id });

  res.status(200).json(currentUser);
};

export { register, authenticate, refreshToken, logout, getCurrentUser };
