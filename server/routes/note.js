const express = require("express");

const router = express.Router();

router
  .route("/note")
  .get((req, res) => {
    res.send("get all notes");
  })
  .post((req, res) => {
    res.send("create note");
  });

router
  .route("/note/:id")
  .get((req, res) => {
    res.send("get single note");
  })
  .delete((req, res) => {
    res.send("delete note");
  })
  .put((req, res) => {
    res.send("update note");
  });

module.exports = router;
