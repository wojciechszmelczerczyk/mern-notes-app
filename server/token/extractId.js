const { decode } = require("jsonwebtoken");

require("dotenv").config();

const extractIdFromToken = (token) => {
  return decode(token);
};

module.exports = extractIdFromToken;
