const mongoose = require('mongoose')

//Schema for blog posts
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true},
  date: {type: String, required: true},
  body: {type: String, required: true}
});

module.exports = mongoose.model("blogs", blogSchema);