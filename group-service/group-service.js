const parseURL = require('url').parse
  , responce =
    { 'POST:/': require('./controllers/group-create')
    , 'GET:/': require('./controllers/group-retrieve')
    }

module.exports = async function (req, res) {
  const { pathname } = parseURL(req.url)
    , { method } = req
  
  await responce[`${method}:${pathname}`](req, res)
}
