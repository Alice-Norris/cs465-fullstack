const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
}

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
