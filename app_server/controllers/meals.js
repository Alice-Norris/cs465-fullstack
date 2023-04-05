const fs = require('fs')
const request = require('request')

const apiOptions = {
  server: 'http://localhost:3000'
}

const renderMealList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Meals';
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if(!responseBody.length) {
      message = 'No meals exist in database!';
    }
  }
  console.log(JSON.stringify(responseBody));
  res.render('meals', {
    title: pageTitle,
    meals: responseBody,
    message
  });
};

const mealList = (req, res) => {
  const path = '/api/meals';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  console.info('>> mealsController.mealList calling ' + requestOptions.url);

  request(
    requestOptions,
    (err, { statusCode }, body) => {
      if (err) {
        console.error(err);
      }
      renderMealList(req, res, body);
    }
  )
}

module.exports = {
  mealList,
  renderMealList
};