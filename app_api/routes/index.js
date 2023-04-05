const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const blogsController = require('../controllers/blogs')

/* API endpoints */
router.get('/trips', tripsController.tripsList);  // all trips
router.get('/trips/:tripCode', tripsController.tripsFindByCode) // trip by code
router.get('/meals', mealsController.mealsList) // all meals
router.get('/blogs', blogsController.blogsList) // all blog posts
module.exports = router;
