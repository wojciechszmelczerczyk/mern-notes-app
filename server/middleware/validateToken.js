require("dotenv").config({ path: `${process.cwd()}/.env` });
const { verify } = require("jsonwebtoken");
const refreshToken = require("../token/refreshToken");

const validateToken = (req, res, next) => {
  // retrieve jwt from cookie
  let token = req.cookies.jwt;

  // if exists
  if (token === null)
    return res
      .json({ access_token_error: "Access Token doesn't exist" })
      .status(401);
  // verify if token is valid

  verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) res.json({ access_token_error: err.name }).status(403);
    // attach user data to request
    req.user = user;
    next();
  });

  // if token doesn't exist throw error
};

validateToken.unless = require("express-unless");

module.exports = validateToken;
