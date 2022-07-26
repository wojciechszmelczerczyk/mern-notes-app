const express = require("express");

const router = express.Router();

// controllers
const {
  getAllNotes,
  getSingleNote,
  createNote,
  fillNoteContent,
  updateNote,
  deleteNote,
  downloadNote,
} = require("../controllers/noteController");

router.route("/note").get(getAllNotes).post(createNote);

router.route("/note/save").post(fillNoteContent);

router.route("/note/:id").get(getSingleNote).delete(deleteNote).put(updateNote);

router.post("/note/:id/file", downloadNote);

module.exports = router;
