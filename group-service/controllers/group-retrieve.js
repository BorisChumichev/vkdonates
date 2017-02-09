const { json, send } = require('micro')
  , groupModel = require('../models/group')
  , parseURL = require('url').parse

module.exports = async function (req, res) {
  const { groupid } = parseURL(req.url, true).query

  if (!groupid)
    return send(res, 402, { error: 'You have to define groupid' })

  send(res, 201, await groupModel.find({ where: { groupId: groupid } }))
}
