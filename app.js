const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const aboutRouter = require('./app_server/routes/about');
// const contactRouter = require('./app_server/routes/contact');
// const indexRouter = require('./app_server/routes/index');
// const mealsRouter = require('./app_server/routes/meals');
// const newsRouter = require('./app_server/routes/news');
// const roomsRouter = require('./app_server/routes/rooms');
// const travelRouter = require('./app_server/routes/travel');
// const usersRouter = require('./app_server/routes/users');

const routers = {
  '/': require('./app_server/routes/index') ,
  '/about': require('./app_server/routes/about') ,
  '/contact': require('./app_server/routes/contact') ,
  '/meals': require('./app_server/routes/meals') ,
  '/news' : require('./app_server/routes/news') ,
  '/rooms' : require('./app_server/routes/rooms') ,
  '/travel' : require('./app_server/routes/travel') ,
}
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars parrtials from the partials folder in views
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

// setting logger and express up
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting up routes
// app.use('/', indexRouter);
// app.use('/about', aboutRouter);
// app.use('/users', usersRouter);
// app.use('/travel', travelRouter);

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
