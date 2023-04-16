const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const blogsController = require('../controllers/blogs')

/* API endpoints */

router
  .route('/trips')
  .get(tripsController.tripsList) // READ all trips
  .post(tripsController.tripsAddTrip); // CREATE one trip

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode) // READ one trip
  .put(tripsController.tripsUpdateTrip) // UPDATE one trip
  .delete(tripsController.tripsDeleteTrip); // DELETE one trip

router.get('/meals', mealsController.mealsList) // all meals
router.get('/blogs', blogsController.blogsList) // all blog posts

module.exports = router;
