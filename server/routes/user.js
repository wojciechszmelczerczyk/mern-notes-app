const express = require("express");

const router = express.Router();

router
  .route("/user")
  .get((req, res) => {
    res.send("user get");
  })
  .post((req, res) => {
    res.send("user post");
  })
  .put((req, res) => {
    res.send("user put");
  });

router.post("/user/authenticate", (req, res) => {
  res.send("user authenticate");
});

module.exports = router;
