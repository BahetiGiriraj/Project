const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("privacy"); // make a new EJS page
});

module.exports = router;
