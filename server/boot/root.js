'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => {
    //todo: check sign here 
    
    try {
      var group = JSON.parse(req.query.api_result).response[0]
      group.wallet = false // temp
      group.group_id = req.query.group_id
      var user = { isAdmin: req.query.viewer_type == 4 }
    } catch(err) {
      res.end('nothin there yet')
    }
    //app.models.Group.find
    // get walet here
    res.render('index', { app, group, user })
  });
  app.use(router);
};
