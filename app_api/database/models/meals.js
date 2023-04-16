const mongoose = require('mongoose')

//Schema for foods
const mealSchema = new mongoose.Schema({
  image: {type: String, required: true, index: true },
  description: { type: String, required: true}
});

module.exports = mongoose.model("meals", mealSchema);