'use strict';

const sha1 = require('sha1')
const R = require('ramda')
const bb = require('bluebird')
const superagent = require('superagent')

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', (req, res, next) => {
    
    try {
      var group = JSON.parse(req.query.api_result).response[0]
      group.group_id = req.query.group_id
      var user = { isAdmin: req.query.viewer_type == 4, user_id: req.query.viewer_id }
      if (user.isAdmin) user.token = (parseInt(req.query.viewer_id) + parseInt(req.query.group_id)).toString(16).replace('.', '')
    } catch(err) {
      return res.end('nothin there yet')
    }
    
    app.models.Group
      .findOne({ where: { group_id: group.group_id } })
      .then(data => {
        group.wallet = data === null
          ? false
          : data.wallet

        app.models.Income.find({ where: { group_id: group.group_id } })
          .then(incomes => {
            if (!incomes.length) return res.render('index', { app, group, user, latestIncomes: '[]', largestIncomes: '[]', stats: [0, 0, 0, 0, 0] })
            
            var desc = function(a, b) { return b.amount - a.amount }
            var byDate = function(a, b) { return b.date - a.date }

            const latestIncomes = R.take(20, R.sort(byDate, incomes))
            const largestIncomes = R.take(20, R.sort(desc, incomes))
            const users = R.uniq(latestIncomes.concat(latestIncomes).map(R.prop('user_id')))

            superagent.get(`https://api.vk.com/method/users.get?user_ids=${users.join(',')}&fields=photo_100`)
              .then(data => { 
                const users = data.body.response
                res.render('index', { app, group, user, latestIncomes: JSON.stringify(latestIncomes), largestIncomes: JSON.stringify(largestIncomes), users: JSON.stringify(users), stats: [0, 0, 0, 0, 0] })
              })
          })
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
        const checkString = `${req.body.notification_type}&${req.body.operation_id}&${req.body.amount}&${req.body.currency}&${req.body.datetime}&${req.body.sender}&${req.body.codepro}&${notification_secret}&${req.body.label}`
        const checkSum = sha1(checkString)
        console.log(checkSum, req.body.sha1_hash)
        if (checkSum !== req.body.sha1_hash) return res.status(401).end()
        app.models.Income.create({
          user_id: req.body.label,
          amount: req.body.amount,
          group_id: req.params.group_id,
          date: new Date(req.body.datetime)
        }).then(income => {
          console.log('CREATED INCOME', income)
          res.status(200).end()
        })
      })
  });

  app.use(router);
};
