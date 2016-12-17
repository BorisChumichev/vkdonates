'use strict';

const { pick } = require('ramda')

module.exports = app => (req, res, next) => {
    if ( (parseInt(req.body.user_id) + parseInt(req.body.group_id)).toString(16).replace('.', '') !== req.body.token )
      return res.status(403).end()

    app.models.Group.upsertWithWhere
      ( { group_id: req.body.group_id }
      , pick([ 'group_id', 'wallet', 'secret' ], req.body)
      , (err, data) => err ? next(err) : res.json(data)
      )
  }
