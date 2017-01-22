const { get, partial } = require('lodash')

module.exports = app => (req, res, next) =>
  app.models.Group.findOne(
      { where:
        { group_id: get(req, 'group.group_id') }
      }
    )
    .then(data => {
      req.group.wallet = data === null
        ? false
        : data.wallet
    })
    .then(partial(next, null))
    .catch(next)
