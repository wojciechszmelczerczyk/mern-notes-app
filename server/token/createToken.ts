import path from "app-root-path";
import { config } from "dotenv";
config({ path: `${path}/.env` });
import { sign } from "jsonwebtoken";

const createToken = (id, secret, exp) => {
  return sign(
    {
      id,
    },
    secret,
    {
      expiresIn: exp,
    }
  );
};

export default createToken;
