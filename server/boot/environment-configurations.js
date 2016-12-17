'use strict';

const { forEach, keys, without, isEmpty } = require('ramda')

const requiredVariables = [ 'VK_SECRET_KEY' ]

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
