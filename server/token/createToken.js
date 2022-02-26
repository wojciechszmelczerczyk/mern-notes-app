const jwt = require("jsonwebtoken");

const maxAge = process.env.JWT_EXPIRATION;

require("dotenv").config({ path: `${process.cwd()}/.env` });

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
