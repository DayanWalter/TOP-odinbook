const express = require('express');
const router = express.Router();
/* GET comment listing. */
router.get('/', function (req, res, next) {
  res.json({ comment });
});

module.exports = router;
