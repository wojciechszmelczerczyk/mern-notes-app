const appRoot = require("app-root-path");
require("dotenv").config({ path: `${appRoot}.env` });

const { decode } = require("jsonwebtoken");

const extractIdFromToken = (token) => {
  return decode(token);
};

module.exports = extractIdFromToken;
