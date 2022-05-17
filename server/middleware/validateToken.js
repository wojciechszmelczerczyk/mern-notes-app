const { verify } = require("jsonwebtoken");

require("dotenv").config({ path: `${process.cwd()}/.env` });

const validateToken = (req, res, next) => {
  console.log("middleware activated");
  try {
    let token = req.headers.cookie;
    if (token) {
      // extract jwt from header
      token = token.slice(4);

      verify(token, process.env.JWT_SECRET, (err) => {
        if (err) throw new Error("Jwt is not valid");
        next();
      });
    } else if (token === undefined) {
      throw new Error("Jwt doesn't exists");
    }
  } catch (err) {
    res.status(401).json({ jwt_error: err.message });
  }
};

validateToken.unless = require("express-unless");

module.exports = validateToken;
