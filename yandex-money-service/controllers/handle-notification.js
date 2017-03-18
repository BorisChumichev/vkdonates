const { send } = require('micro')
  , parseURL = require('url').parse
  , parse = require('urlencoded-body-parser')
  , notificationModel = require('../models/notification')
  , incomeModel = require('../models/income')
  , groupModel = require('../models/group')

module.exports = async function (req, res) {
  const groupId = parseURL(req.url).pathname.match(/notify\/(\d+)/)[1]
    , groupSecret = await groupModel.getSecretForGroup(groupId)
    , notificationRequest = await parse(req)

  try {
    notificationModel.validateNotificationRequest(notificationRequest, groupSecret)
  } catch (error) {
    return send(res, 400, { message: 'Bad Request' })
  }

  await incomeModel.create(
    { 'userId': notificationRequest.label
    , 'groupId': groupId
    , 'date': notificationRequest.datetime
    , 'amount': notificationRequest.amount
    , 'actualAmount': notificationRequest['withdraw_amount']
    }
  )

  return send(res, 200, { message: 'Danke schön!' })
}
