require("dotenv").config({ path: `${process.cwd()}/.env` });
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    // retrieve jwt from auth header
    let authHeader = req.headers["authorization"];

    let token = authHeader && authHeader.split(" ")[1];
    // if token doesn't exist throw error
    if (token === undefined) throw new Error("Jwt doesn't exist");

    // otherwise check if token expired
    verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          res.status(403).json({ err: error.message });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({
      fail: true,
      error: error.message,
    });
  }
};

validateToken.unless = require("express-unless");

module.exports = validateToken;
