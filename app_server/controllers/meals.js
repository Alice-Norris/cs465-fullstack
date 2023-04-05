const fs = require('fs')
const request = require('request')

const apiOptions = {
  server: 'http://localhost:3000'
}
// parsing meal data to be inserted into handlebars partial
const foods = JSON.parse(fs.readFileSync('./data/meals.json'))
/* GET meals view */
const meals = (req, res) => {
  res.render('meals', {title: 'Meals' , foods});
};

module.exports = {
  meals
};