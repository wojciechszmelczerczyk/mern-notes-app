require("dotenv").config();
const express = require("express");
const router = express.Router();

const speechTokenController = require("../controllers/speechTokenController");

router.get("/api/get-speech-token", speechTokenController);

module.exports = router;
