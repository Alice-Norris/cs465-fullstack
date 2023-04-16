const request = require('request')

// configuring basic request options
const apiOptions = {
  server: 'http://localhost:3000'
}

// renders blog list 
const renderBlogsList = (req, res, responseBody) => {
  let message = null;
  console.log('Rendering...');
  // if response is not an array (it hasn't responded, is it offline?)
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    // if response body does not have anything in it
    if(!responseBody.length) {
      message = 'No posts exist in database!';
    }
  }
  console.log(JSON.stringify(responseBody));
  // render page using received blog list
  res.render('index', {
    posts: responseBody,
    message
  });
};

// requesting blog post data to be inserted into handlebars partial
const blogsList = (req, res) => {
  // setting path and options for http request
  const path = '/api/blogs';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  console.info('>> blogsController.postList calling ' + requestOptions.url);
  //issue the request
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      // print error message if received
      if (err) {
        console.error(err);
      }
      // render blog list using the appropriate function
      renderBlogsList(req, res, body);
    }
  )
}

module.exports = {
  blogsList,
  renderBlogsList
};