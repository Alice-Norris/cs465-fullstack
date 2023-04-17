const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
})

const tripsController = require('../controllers/trips');
const mealsController = require('../controllers/meals');
const blogsController = require('../controllers/blogs');
const authController = require('../controllers/authentication');
/* API endpoints */

router
  .route('/login')
  // UNPROTECTED OPERATION
  .post(authController.login); // login via authController

router
  .route('/register')
  // UNPROTECTED OPERATION
  .post(authController.register); // register via authController

router
  .route('/trips')
  // UNPROTECTED OPERATION
  .get(tripsController.tripsList) // returns list of trips
  // PROTECTED OPERATION
  .post(auth, tripsController.tripsAddTrip); // add a trip

router
  .route('/trips/:tripCode')
  // UNPROTECTED OPERATION
  .get(tripsController.tripsFindCode) // return trip by code
  // PROTECTED OPERATIONS
  .put(auth, tripsController.tripsUpdateTrip) // edit trip by code
  .delete(auth, tripsController.tripsDeleteTrip) // delete trip by code

router
  // UNPROTECTED OPERATION
  .route('/meals')
  .get(mealsController.mealsList) // all meals

router
  // UNPROTECTED OPERATION
  .route('/blogs')
  .get(blogsController.blogsList) // all blog posts


module.exports = router;
