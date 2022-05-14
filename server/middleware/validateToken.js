const { verify } = require("jsonwebtoken");

require("dotenv").config({ path: `${process.cwd()}/.env` });

const validateToken = (req, res, next) => {
  try {
    let token = req.headers.cookie;
    if (token) {
      token = token.slice(4);
      verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) throw new Error("Jwt is not valid");
        next();
      });
    } else if (token === undefined) {
      throw new Error("Jwt doesn't exists");
    }
  } catch (err) {
    res.json({ jwt_error: err.message });
  }
};

module.exports = validateToken;
