const express = require("express");

const router = express.Router();

// controllers
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.route("/note").get(getAllNotes).post(createNote);

router.route("/note/:id").get(getSingleNote).delete(deleteNote).put(updateNote);

module.exports = router;
