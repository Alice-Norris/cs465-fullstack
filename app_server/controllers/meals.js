const fs = require('fs')

// parsing meal data to be inserted into handlebars partial
const foods = JSON.parse(fs.readFileSync('./data/meals.json'))
/* GET meals view */
const meals = (req, res) => {
  res.render('meals', {title: 'Meals' , foods});
};

module.exports = {
  meals
};