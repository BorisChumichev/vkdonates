require('../../common/util/dotenv').config(
  [ 'INCOME_SERVICE_URL'
  ]
)

const request = require('request-promise')

module.exports = {
  create: async income =>
    await request(
      { method: 'POST'
      , uri: process.env.INCOME_SERVICE_URL + '/'
      , body: income
      , json: true
      }
    )
}
