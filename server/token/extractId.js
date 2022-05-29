const { path } = require("app-root-path");
require("dotenv").config({ path: `${path}/.env` });

const { decode } = require("jsonwebtoken");

const extractIdFromToken = (token) => {
  const { id } = decode(token);
  return id;
};

module.exports = extractIdFromToken;
