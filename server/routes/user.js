const express = require("express");

const router = express.Router();

// controllers

const {
  register,
  authenticate,
  refreshToken,
  logout,
  getCurrentUser,
  updateUser,
} = require("../controllers/userController");

router
  .route("/user")
  .get(getCurrentUser)
  .post(register)
  .put(updateUser)
  .delete(logout);

router.post("/user/authenticate", authenticate);

router.post("/user/refresh-token", refreshToken);

module.exports = router;
