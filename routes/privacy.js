const express = require("express");
const router = express.Router();

// Add your route logic here
router.get('/privacy', (req, res) => {
  const currUser = req.user || null; // or some logic to fetch the current user
  res.render('privacy', { currUser });
});




module.exports = router;
