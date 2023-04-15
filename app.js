require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

require('./app_api/database/db')

require('./app_api/config/passport');

const routers = {
  '/': require('./app_server/routes/index') ,
  '/about': require('./app_server/routes/about') ,
  '/contact': require('./app_server/routes/contact') ,
  '/meals': require('./app_server/routes/meals') ,
  '/news' : require('./app_server/routes/news') ,
  '/rooms' : require('./app_server/routes/rooms') ,
  '/travel' : require('./app_server/routes/travel') ,
  '/users': require('./app_server/routes/users'),
  '/api' : require('./app_api/routes/index')
}
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials from the partials folder in views
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

// setting logger and express up
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

// catch all unauthorized errors, return 401 status with error message
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

// setting up routes
for (var routerKey in routers) {
  app.use(routerKey, routers[routerKey])
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
