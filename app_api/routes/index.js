const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const blogsController = require('../controllers/blogs')

/* API endpoints */

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip); // all trips

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip) // trip by code

router.get('/meals', mealsController.mealsList) // all meals
router.get('/blogs', blogsController.blogsList) // all blog posts

module.exports = router;
