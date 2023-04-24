const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
}

// setting up news to use modal and layout
const news = (req, res) => {
  res.render('news', { 
    title: 'News',
    modal: 'loginModal',
    layout: '../views/layouts/layout'
  });
};

module.exports = {
  news
};
