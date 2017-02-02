const parseURL = require('url').parse
  , responce =
    { 'POST:/': require('./controllers/income-create')
    , 'GET:/group-report': require('./controllers/income-group-report')
    }

module.exports = async function (req, res) {
  const { pathname } = parseURL(req.url)
    , { method } = req
  
  await responce[`${method}:${pathname}`](req, res)
}
