import createError from 'http-errors';
import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from 'Routes/index';
import dashboardRouter from 'Routes/dashboard';
import sellerRouter from 'Routes/seller';

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var dashboardRouter = require('./routes/dashboard');
// var sellerRouter = require('./routes/seller');
// const __dirname = path.resolve();

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views/pages', express.static(path.resolve(__dirname, '/views/pages')));
app.set('view engine', 'ejs'); 
app.set('env', 'development');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// if the link starts with /[a-link] then use dashboard router
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/seller', sellerRouter);

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

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
