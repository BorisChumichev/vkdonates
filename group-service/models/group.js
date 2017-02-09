const { STRING } = require('sequelize')
const db = require('../../common/util/db')

db.define('group',
  { groupId: { type: STRING, unique: true }
  , wallet: { type: STRING }
  , secret: { type: STRING }
  }
).sync()

module.exports = db.models.group
