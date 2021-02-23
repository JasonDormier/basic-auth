'use strict';

module.exports = function (req, res) {
  res.status(404).send('That route is not found');
};