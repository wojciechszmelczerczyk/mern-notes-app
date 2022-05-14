const express = require("express");

const router = express.Router();

const validateToken = require("../middleware/validateToken");

// controllers
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.use(validateToken);

router.route("/note").get(getAllNotes).post(createNote);

router.route("/note/:id").get(getSingleNote).delete(deleteNote).put(updateNote);

module.exports = router;
