const { path } = require("app-root-path");
require("dotenv").config({ path: `${path}/.env` });

const { decode } = require("jsonwebtoken");

const extractIdFromToken = (token) => {
  return decode(token);
};

module.exports = extractIdFromToken;
