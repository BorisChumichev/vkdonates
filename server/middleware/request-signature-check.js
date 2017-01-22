const crypto = require('crypto')
  , { reject, keys, contains } = require('ramda')

const filterRequestParams = requestParams =>
  reject(
    param => contains(param, ['api_result', 'sign', 'hash']),
    requestParams
  )


module.exports = app => (req, res, next) => {
  const hmac = crypto.createHmac('sha256', app.get('VK_SECRET_KEY'))

  hmac.update(
    filterRequestParams(keys(req.query))
      .map(param => req.query[param].replace(' ', '+'))
      .join('')
  )

  hmac.digest('hex') === req.query.sign
    ? next()
    : res.status(403).end()
}
