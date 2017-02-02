const { STRING, DATE, DOUBLE } = require('sequelize')
const db = require('../../common/util/db')

db.define('income',
  { userId: { type: STRING }
  , groupId: { type: STRING }
  , date: { type: DATE }
  , amount: { type: DOUBLE }
  , actualAmount: { type: DOUBLE }
  }
).sync()

db.models.income.incomesCountForGroup = async function (groupId) {
  return this.count({ where: { groupId } })
}

db.models.income.totalIncomeForGroup = async function (groupId) {
  return this.sum('amount', { where: { groupId } })
}

db.models.income.averageIncomeForGroup = async function (groupId) {
  const agg = await this.findAll(
    { attributes: [ [ db.fn('AVG', db.col('amount')), 'averageIncome' ] ]
    , where: { groupId }
  })
  
  return agg[0].get('averageIncome')
}

db.models.income.sponsorsCountForGroup = async function (groupId) {
  const agg = await this.findAll(
    { attributes: [ [db.literal('COUNT(DISTINCT("userId"))'), 'distinctUsers'] ]
    , where: { groupId }
    }
  )
  
  return parseInt(agg[0].get('distinctUsers'))
}

module.exports = db.models.income
