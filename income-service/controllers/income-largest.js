const { send } = require('micro')
  , parseURL = require('url').parse
  , incomeModel = require('../models/income')

module.exports = async function (req, res) {
  const { groupid, limit, offset } = parseURL(req.url, true).query

  send(res, 200, await incomeModel.findAll(
      { order: [ [ 'amount', 'DESC' ] ]
      , where: { groupId: groupid }
      , limit
      , offset
      }
    )
  )
}
