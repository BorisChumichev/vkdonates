const { forEach, keys, without, isEmpty, not } = require('ramda')
  
  , errorMessage = vars =>
    `You have to define ${vars.join(',')} environment variable`

  , createProxy = (dotenv, requiredVariables) => {
      const configOriginal = dotenv.config

      dotenv.config = () => {
        configOriginal.call(dotenv)

        const missedRequiredVars = without(keys(process.env), requiredVariables)
        
        if (not(isEmpty(missedRequiredVars)))
          throw new Error(errorMessage(missedRequiredVars))
      }
      return dotenv
    }

module.exports = requiredVariables =>
  createProxy(require('dotenv'), requiredVariables)
