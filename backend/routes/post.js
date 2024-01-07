const express = require('express');
const router = express.Router();
/* GET post listing. */
router.get('/', function (req, res, next) {
  res.json({ post });
});

module.exports = router;
