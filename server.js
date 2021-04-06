// const createError = require('http-errors');
require('dotenv').config();
const express = require('express');
// var path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const app = express();
const cors = require('cors');
const passport = require('passport');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const PORT = process.env.PORT || 8000;

//  api
const users = require('./api/users');
// const request = require('./api/request');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// MIDDLEWARE
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected to back end'});
});

app.use('/api/users', users);
// app.use('/users', usersRouter);

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

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
})

module.exports = app;
