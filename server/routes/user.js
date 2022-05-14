const express = require("express");

const router = express.Router();

const validateToken = require("../middleware/validateToken");

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
  .get(validateToken, getCurrentUser)
  .post(register)
  .put(validateToken, updateUser)
  .delete(validateToken, logout);

router.post("/user/authenticate", authenticate);

module.exports = router;
