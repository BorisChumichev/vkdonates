'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => {
    const group = JSON.parse(req.query.api_result).response[0]
    res.render('index', { app, group })
  });
  app.use(router);
};
