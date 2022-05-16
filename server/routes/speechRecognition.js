require("dotenv").config();
const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateToken");

const speechTokenController = require("../controllers/speechTokenController");

router.use(validateToken);

router.get("/api/get-speech-token", speechTokenController);

module.exports = router;
