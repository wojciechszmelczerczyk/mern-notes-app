const express = require("express");

const router = express.Router();

// controllers

const {
  register,
  authenticate,
  getCurrentUser,
  updateUser,
} = require("../controllers/userController");

router.route("/user").get(getCurrentUser).post(register).put(updateUser);

router.post("/user/authenticate", authenticate);

module.exports = router;
