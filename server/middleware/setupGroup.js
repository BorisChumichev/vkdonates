const { pick } = require('ramda')
const sha1 = require('sha1')

module.exports = app => (req, res, next) => {
  if (sha1(
        req.body.user_id
        + req.body.group_id
        + app.get('VK_SECRET_KEY')
      ) !== req.body.token
    ) return res.status(403).end()

  app.models.Group.upsertWithWhere(
      { group_id: req.body.group_id },
      pick([ 'group_id', 'wallet', 'secret' ], req.body),
      (err, data) => err ? next(err) : res.json(data)
    )
  }
