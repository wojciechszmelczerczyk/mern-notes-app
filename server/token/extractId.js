const jwt = require("jsonwebtoken");

require("dotenv").config({ path: `${process.cwd()}/.env` });

const extractIdFromToken = (token) => {
  return jwt.decode(token);
};

module.exports = extractIdFromToken;
