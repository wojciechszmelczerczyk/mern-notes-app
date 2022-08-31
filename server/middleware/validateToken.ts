import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import unless from "express-unless";
config({ path: `${process.cwd()}/.env` });

const validateToken = (req, res, next) => {
  try {
    // retrieve jwt from auth header
    let authHeader = req.headers["authorization"];

    let at = authHeader && authHeader.split(" ")[1];

    // if token doesn't exist throw error
    if (at === undefined) throw new Error("Jwt doesn't exist");

    // otherwise check if token expired
    verify(at, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          res.status(403).json({ err: error.message });
        }
      } else {
        req.user = user;
        console.log(req.user);
        next();
      }
    });
  } catch (error) {
    res.status(403).json({
      fail: true,
      error: error.message,
    });
  }
};

validateToken.unless = unless;

export default validateToken;
