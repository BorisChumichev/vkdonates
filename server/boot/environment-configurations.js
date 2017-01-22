const { forEach, keys, without, isEmpty } = require('ramda')

const requiredVariables =
  [ 'VK_SECRET_KEY'
  , 'DB_HOST'
  , 'DB_USER'
  , 'DB_PASSWORD'
  , 'DB_DATABASE'
  ]

module.exports = app => {
  const passedVars = keys(process.env)
    , missedRequiredVars = without(passedVars, requiredVariables)

  if (isEmpty(missedRequiredVars))
    forEach(
      key => app.set(key, process.env[key]),
      passedVars
    )
  else
    throw new Error(
        `You have to define ${missedRequiredVars.join(',')} for your environment`
      )
}
