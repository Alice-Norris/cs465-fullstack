const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//registration function
const register = (req, res) => {
  // return error 400 if name, email, or pass is missing
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({"message": "All fields required"});
  }

  // creating new user and setting password
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save((err) => {
    // return 400 if failure
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      //return token to client on success
      const token = user.generateJwt();
      res
        .status(200)
        .json({token});
    }
  })
};

const login = (req, res) => {
  // return error 400 if email or pass is empty
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({"message": "All fields required"});
  }
  
  //authenticate user, return 404 on errors, 200 and token on success, 
  //and 401 (Unauthorized) on fail.
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res
        .status(404)
        .json(err);
    }
    if (user) {
      const token = user.generateJwt();
      res
        .status(200)
        .json({token});
    } else {
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};