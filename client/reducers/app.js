import R from 'ramda'
import moment from 'moment'
import { merge } from 'ramda'

const defaultState = {
  greeting: 'привет'
}

const selector = (state = defaultState, action) => {
  switch (action.type) {
    case 'BYE':
      return merge(state, { greeting: 'пока' })

    default:
      return state
  }
}

export default selector