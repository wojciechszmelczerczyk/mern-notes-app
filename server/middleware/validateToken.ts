import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import unless from "express-unless";
config({ path: `${process.cwd()}/.env` });

const validateToken = (req, res, next) => {
  // retrieve jwt from auth header
  let authHeader = req.headers["authorization"];

  let at = authHeader && authHeader.split(" ")[1];
  // if token doesn't exist throw error
  if (at === undefined)
    return res.status(403).json({ fail: true, err: "No Jwt provided" });

  // otherwise check if token expired
  verify(at, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) {
      // if token expired, throw error
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ fail: true, err: "Jwt has expired" });
      }
    } else {
      // otherwise assign payload to user, pass handler
      req.user = user;
      next();
    }
  });
  // catch all errors and return error message
};

validateToken.unless = unless;

export default validateToken;
