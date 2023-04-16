const mongoose = require('mongoose'); 
const Trip = mongoose.model('trips');

// mongoose.set('debug', true)

//GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  Trip
    .find({}) // empty filter finds all
    .exec((err, trips) => {
      if(!trips) { //if no result return 404 (successful, but no trips?)
        return res
          .status(404)
          .json({ "message": "trips not found" });
      } else if (err) { // return error if error response with 404 (not found)
        return res
          .status(404)
          .json(err)
      } else {
        return res // else return trips with status 200
          .status(200)
          .json(trips);
      }
    });
};

// GET: /trips/:tripCode - returns single trip
const tripsFindByCode = async (req, res) => {
  Trip
    .find({ 'code': req.params.tripCode }) // find one trip by tripcode
    .exec((err, trip) => {
      if (!trip) { // if no result return 404 (successful, but no trips?)
        return res
          .status(404)
          .json({ "message": "trip not found" });
      } else if (err) { // return error if error response with 404 (not found)
        return res
          .status(404)
          .json(err);
      } else {
        return res // return single trip with status 200 (OK)
          .status(200)
          .json(trip);
      }
    });
};

// POST: /trips - adds a trip
const tripsAddTrip = async (req, res) => {
  Trip // creates a trip in database using form data
    .create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
    (err, trip) => {
      if (err) {
        return res // return error if request has errors with status 400 (Bad req)
          .status(400)
          .json(err);
      } else {
        return res
          .status(201) // return added trip data and status 201 (created)
          .json(trip);
      }
    });
}

// PUT: /trips/:tripCode - edits a trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  Trip // updates trip information for one trip with form data
    .findOneAndUpdate({ 'code': req.params.tripCode }, {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    }, {new: true})
    .then(trip => {
      if (!trip) { // return error if tripCode not found with status 404 (not found)
        return res
          .status(404)
          .send({message: "Trip not found with code " + req.params.tripCode});
      }
      res.send(trip); // send trip
    }).catch(err => {
      if (err.kind === 'ObjectId') { // return objectId errors with status 404 (not found)
        return res
          .status(404)
          .send({message: "Trip not found with code " + req.params.TripCode });
      }
      return res ()
        .status(500) // server error
        .json(err);
    });
}

// DELETE: /trips/tripCode - deletes a trip
const tripsDeleteTrip = async(req, res) => {
  console.log(req.body)
  Trip // deletes trip information for one trip with form data
    .deleteOne({ 'code': req.params.tripCode })
    .then(trip => {
      if (!trip) { // return error if tripCode not found with status 404 (not found)
        return res
        .status(404)
        .send({message: "Trip not found with code " + req.params.tripCode});
      }
      res.send(trip); // send trip data
    }).catch(err => {
      if (err.kind === 'ObjectId') { // return objectId errors with status 404 (not found)
        return res
        .status(404)
        .send({message: "Trip not found with code " + req.params.tripCode});
      }
      return res
        .status(500) // server error
        .json(err);
    });
}

module.exports = {
  tripsAddTrip,    // CREATE one trip
  tripsList,       // READ all trips
  tripsFindByCode, // READ one trip
  tripsUpdateTrip, // UPDATE one trip
  tripsDeleteTrip  // DELETE one trip
};