'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');

const userRouter = require('./auth/router.js');
const error500 = require('./middleware/500.js');
const error404 = require('./middleware/404.js');

// Prepare the express app
const app = express();
// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(error500);
app.use('*', error404);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => console.log('App is running on port:: ', port));
  },
};
