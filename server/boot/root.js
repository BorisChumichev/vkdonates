'use strict';

const sha1 = require('sha1')

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => {
    
    try {
      var group = JSON.parse(req.query.api_result).response[0]
      group.group_id = req.query.group_id
      var user = { isAdmin: req.query.viewer_type == 4, user_id: req.query.viewer_id }
      if (user.isAdmin) user.token = (parseInt(req.query.viewer_id) + parseInt(req.query.group_id)).toString(16).replace('.', '')
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

  router.post('/configure', (req, res, next) => {
    
    if ( (parseInt(req.body.user_id) + parseInt(req.body.group_id)).toString(16).replace('.', '') !== req.body.token )
      return res.status(403).end()

    app.models.Group.upsertWithWhere(
      { group_id: req.body.group_id },
      {
        group_id: req.body.group_id,
        wallet: req.body.wallet,
        secret: req.body.secret
      }, (data, err) => {    
        res.json(data)
      }
    )
  });

  router.post('/notify/:group_id', (req, res, next) => {
    //if (req.body.operation_id === 'test-notification') return res.status(200).end()

    app.models.Group
      .findOne({ where: { group_id: req.params.group_id } })
      .then(group => {
        const notification_secret = group.secret
        const checkString = `${req.query.notification_type}&${req.query.operation_id}&${req.query.amount}&${req.query.currency}&${req.query.datetime}&${req.query.sender}&${req.query.codepro}&${notification_secret}&${req.query.label}`
        const checkSum = sha1(checkString)
        console.log(checkSum, req.query.sha1_hash)
        if (checkSum !== req.query.sha1_hash) return res.status(401).end()
        app.models.Income.create({
          user_id: req.query.label,
          amount: req.query.amount,
          group_id: req.params.group_id,
          date: new Date(req.query.datetime)
        }).then(income => {
          console.log('CREATED INCOME', income)
        })
      })
    



    res.status(200).end()
  });

  app.use(router);
};
