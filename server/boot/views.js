'use strict';

module.exports = app =>
  app
    .set('view engine', 'pug')
    .set('views', './server/views')
