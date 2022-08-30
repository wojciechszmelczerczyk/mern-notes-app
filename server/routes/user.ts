import { Router } from "express";

const router = Router();

// controllers
import {
  register,
  authenticate,
  refreshToken,
  logout,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";

router
  .route("/user")
  .get(getCurrentUser)
  .post(register)
  .put(updateUser)
  .delete(logout);

router.post("/user/authenticate", authenticate);

router.get("/user/refresh-token", refreshToken);

export default router;
