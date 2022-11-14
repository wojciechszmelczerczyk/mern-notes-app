import { Router } from "express";

const router = Router();

// controllers
import {
  register,
  authenticate,
  refreshToken,
  logout,
  getCurrentUser,
} from "../controllers/userController";

router.route("/").get(getCurrentUser).post(register).delete(logout);

router.post("/authenticate", authenticate);

router.get("/refresh-token", refreshToken);

export default router;
