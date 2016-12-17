const crypto = require('crypto')
  , { map, reject, keys } = require('ramda')

module.exports = (request, key) => {
  const hmac = crypto.createHmac('sha1', key)
    , string = reject(key => key === '' : '', keys(request))

  hmac.update(string)

  return hmac.digest('hex')
}
