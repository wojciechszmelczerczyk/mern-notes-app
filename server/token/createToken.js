const { path } = require("app-root-path");

require("dotenv").config({ path: `${path}/.env` });

const { sign } = require("jsonwebtoken");

const createToken = (id, secret, exp) => {
  return sign(
    {
      id,
    },
    secret,
    {
      expiresIn: exp,
    }
  );
};

module.exports = createToken;
