const fs = require('fs')

// parsing blog post data to be inserted into handlebars partial
const posts = JSON.parse(fs.readFileSync('./data/blogposts.json', 'utf8'))

/*GET request for homepage*/
const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' , posts});
};

module.exports = {
  index
};