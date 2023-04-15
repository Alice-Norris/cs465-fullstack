const request = require('request')

const apiOptions = {
  server: 'http://localhost:3000'
}

const renderBlogsList = (req, res, responseBody) => {
  let message = null;
  console.log('Rendering...');
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if(!responseBody.length) {
      message = 'No meals exist in database!';
    }
  }
  console.log(JSON.stringify(responseBody));
  res.render('index', {
    posts: responseBody,
    message
  });
};

// parsing blog post data to be inserted into handlebars partial
const blogsList = (req, res) => {
  const path = '/api/blogs';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  console.info('>> blogsController.postList calling ' + requestOptions.url);

  request(
    requestOptions,
    (err, { statusCode }, body) => {
      if (err) {
        console.error(err);
      }
      renderBlogsList(req, res, body);
    }
  )
}

module.exports = {
  blogsList,
  renderBlogsList
};