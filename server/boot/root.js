'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => res.render('index', { app }));
  app.use(router);
};
