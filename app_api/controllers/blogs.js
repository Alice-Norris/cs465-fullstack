const res = require('express/lib/response');
const mongoose = require('mongoose');
const model = mongoose.model('blogs');

const blogsList = async (req, res) => {
  model
    .find({})
    .exec((err, meals) => {
      if(!meals) {
        return res
          .status(404)
          .json({ "message": "blogs not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err) 
      } else {
        return res
          .status(200)
          .json(meals);
      }
    })
};

module.exports = {
  blogsList
};