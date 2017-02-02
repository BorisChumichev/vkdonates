const { json, send } = require('micro')
  , incomeModel = require('../models/income')

module.exports = async function (req, res) {
  const income = await json(req)
    , persistedIncome = await incomeModel.create(income)
  
  send(res, 201, persistedIncome)
}
