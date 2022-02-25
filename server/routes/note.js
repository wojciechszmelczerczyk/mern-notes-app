const express = require("express");

const router = express.Router();

// controllers
const {
  getAllNotes,
  getSingleNote,
  createNote,
} = require("../controllers/noteController");
router.route("/note").get(getAllNotes).post(createNote);

router
  .route("/note/:id")
  .get(getSingleNote)
  .delete((req, res) => {
    res.send("delete note");
  })
  .put((req, res) => {
    res.send("update note");
  });

module.exports = router;
