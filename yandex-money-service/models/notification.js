const sha1 = require('sha1')

module.exports = {
  validateNotificationRequest(request, secret) {
    const checkSum = sha1(
        [ request.notification_type
        , request.operation_id
        , request.amount
        , request.currency
        , request.datetime
        , request.sender
        , request.codepro
        , secret
        , request.label
        ].join('&')
      )

    console.log(checkSum, request.sha1_hash)
    if (checkSum !== request.sha1_hash) throw new Error('Bad Request')
  }
}
