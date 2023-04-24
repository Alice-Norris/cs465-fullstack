const redirectToAdmin = (req, res) => {
  res.redirect('http://localhost:4200/travel');
};

module.exports = {
  redirectToAdmin
};