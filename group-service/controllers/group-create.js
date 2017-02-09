const { json, send } = require('micro')
  , groupModel = require('../models/group')

module.exports = async function (req, res) {
  const group = await json(req)

  await groupModel.upsert(
    group, { where: { groupId: group.groupId } }
  )

  send(res, 201, await groupModel.find({ where: { groupId: group.groupId } }))
}
