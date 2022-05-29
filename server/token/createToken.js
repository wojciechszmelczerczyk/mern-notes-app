const { path } = require("app-root-path");

require("dotenv").config({ path: `${path}/.env` });

const { sign } = require("jsonwebtoken");

const maxAge = process.env.JWT_EXPIRATION;

const createToken = (id) => {
  return sign(
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
