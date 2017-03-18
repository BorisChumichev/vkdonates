const parseURL = require('url').parse
  , responce =
    { 'POST:/': require('./controllers/income-create')
    , 'GET:/group-report': require('./controllers/income-group-report')
    , 'GET:/latest': require('./controllers/income-latest')
    , 'GET:/largest': require('./controllers/income-largest')
    }

module.exports = async function (req, res) {
  const { pathname } = parseURL(req.url)
    , { method } = req

  await responce[`${method}:${pathname}`](req, res)
}
