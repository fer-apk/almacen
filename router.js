const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express funcionando");
});

module.exports = router;