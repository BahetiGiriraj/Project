const express = require("express");
const router = express.Router();

app.get('/privacy', (req, res) => {
    const currUser = req.user || null; // Fetch the current user or set it to null if not logged in
    res.render('privacy', { currUser });
});

module.exports = router;
