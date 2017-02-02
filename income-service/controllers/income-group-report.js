const { send } = require('micro')
  , parseURL = require('url').parse
  , incomeModel = require('../models/income')

module.exports = async function (req, res) {
  const { groupid } = parseURL(req.url, true).query
  
  send(res, 200,
    { incomesCount: await incomeModel.incomesCountForGroup(groupid)
    , averageIncome: await incomeModel.averageIncomeForGroup(groupid)
    , sponsorsCount: await incomeModel.sponsorsCountForGroup(groupid)
    , totalIncome: await incomeModel.totalIncomeForGroup(groupid)
    }
  )
}
