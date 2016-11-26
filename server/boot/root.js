'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => {
    
    //todo: check sign here 
    
    try {
      var group = JSON.parse(req.query.api_result).response[0]
      group.group_id = req.query.group_id
      var user = { isAdmin: req.query.viewer_type == 4, user_id: req.query.viewer_id }
      if (user.isAdmin) user.token = (parseInt(req.query.viewer_id) * 3).toString(16).replace('.', '')
    } catch(err) {
      res.end('nothin there yet')
    }
    
    app.models.Group
      .findOne({ where: { group_id: group.group_id } })
      .then(data => {
        group.wallet = data === null
          ? false
          : data.wallet

        res.render('index', { app, group, user })
      })

    
  });
  app.use(router);
};
