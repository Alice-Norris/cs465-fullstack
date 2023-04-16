const fs = require('fs')
const request = require('request')

// configuring basic request options
const apiOptions = {
  server: 'http://localhost:3000'
}

// renders trip list 
const renderTravelList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Travel';
  // if resposne is not an array (it hasn't reasponded, is it offline?)
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    // if response body doesn't have anything in it
    if (!responseBody.length) {
      message = 'No trips exist in database!';
    }
  }
  console.log("Res in renderTravelList: " + JSON.stringify(responseBody));
  console.log("Title: " + pageTitle + "\nResponse Body:" + JSON.stringify(responseBody));
  // render page using received blog list
  res.render('travel', {
    title: pageTitle,
    trips: responseBody,
    message
  });
};

// requesting trips data to be inserted into handlebars partial
const travelList = (req, res) => {
  // setting path and http request options
  const path = '/api/trips';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  console.info('>> travelController.travelList calling ' + requestOptions.url);
  //issue request
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      // print error message if received
      if (err) {
        console.error(err);
      }
      // render blog list using appropriate function
      renderTravelList(req, res, body);
    }
  )
}

module.exports = {
  travelList,
  renderTravelList
};

