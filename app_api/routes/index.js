const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

/* GET home page. */
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode)

module.exports = router;
