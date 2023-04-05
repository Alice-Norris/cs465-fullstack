const express = require('express');
const router = express.Router();
const controller = require('../controllers/meals');

/* GET meals page */
router.get('/', controller.mealList);

module.exports = router;