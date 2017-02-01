// Monkey patching dotenv’s config method so that
// it accepts list of required variables and throws
// an error if any of required variables is missing.
// Returns a proxy object that targets to dotenv.

const { keys, without, isEmpty, not } = require('ramda')
  
  , errorMessage = vars =>
    `${vars.join(',')} must be defined for your environment.`

  , createProxy = dotenv => {
      const configOriginal = dotenv.config

      dotenv.config = requiredVariables => {
        configOriginal.call(dotenv)

        const missedRequiredVars = without(keys(process.env), requiredVariables)
        
        if (not(isEmpty(missedRequiredVars)))
          throw new Error(errorMessage(missedRequiredVars))
      }

      return dotenv
    }

module.exports = createProxy(require('dotenv'))
