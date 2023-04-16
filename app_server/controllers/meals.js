const fs = require('fs')
const request = require('request')

const apiOptions = {
  server: 'http://localhost:3000'
}

// renders meal list 
const renderMealList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Meals';
  // if response is not an array (it hasn't responded, is it offline?)
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    // if response body does not have anything in it
    if(!responseBody.length) {
      message = 'No meals exist in database!';
    }
  }
  console.log(JSON.stringify(responseBody));
    // render page using received meals list
  res.render('meals', {
    title: pageTitle,
    meals: responseBody,
    message
  });
};

// requesting meal data to be inserted into handlebars partial
const mealList = (req, res) => {
  // setting path and options for http request
  const path = '/api/meals';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  console.info('>> mealsController.mealList calling ' + requestOptions.url);

  //issue request
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      // print error message if received
      if (err) {
        console.error(err);
      }
      // render meal list using appropriate function
      renderMealList(req, res, body);
    }
  )
}

module.exports = {
  mealList,
  renderMealList
};