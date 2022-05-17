const express = require("express");

const router = express.Router();

// controllers

const {
  register,
  authenticate,
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

module.exports = router;
