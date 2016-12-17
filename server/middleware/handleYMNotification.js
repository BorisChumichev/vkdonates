module.exports = app => (req, res, next) => {
    //if (req.body.operation_id === 'test-notification') return res.status(200).end()

    app.models.Group
      .findOne({ where: { group_id: req.params.group_id } })
      .then(group => {
        const checkString =
          [ req.body.notification_type
          , req.body.operation_id
          , req.body.amount
          , req.body.currency
          , req.body.datetime
          , req.body.sender
          , req.body.codepro
          , group.secret
          , req.body.label
          ].join('&')
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
  }
