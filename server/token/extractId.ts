import path from "app-root-path";
import { config } from "dotenv";
config({ path: `${path}/.env` });

import { decode } from "jsonwebtoken";

const extractIdFromToken = (token) => {
  const { id } = decode(token);
  return id;
};

export default extractIdFromToken;
