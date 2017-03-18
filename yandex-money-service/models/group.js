require('../../common/util/dotenv').config(
  [ 'GROUP_SERVICE_URL'
  ]
)

const request = require('request-promise')

module.exports = {
  getSecretForGroup: async id => {
    const group = await request(
      { method: 'GET'
      , uri: `${process.env.GROUP_SERVICE_URL}/?groupid=${id}`
      , json: true
      }
    )

    return group.secret
  }
}
