require("dotenv").config();

const jwt = require("jsonwebtoken");

const maxAge = process.env.JWT_EXPIRATION;

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};

module.exports = createToken;
