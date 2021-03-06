import R from 'ramda'
import moment from 'moment'
import { merge } from 'ramda'

const defaultState = {
  wallet: group.wallet,
  route: user.isAdmin && !group.wallet
    ? 'settings'
    : !user.isAdmin && !group.wallet
      ? 'comelater'
      : 'main',
  isLoading: false
}

const selector = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_WALLET':
      return merge(state, { wallet: action.wallet })

    case 'TOGGLE_LOADING':
      return merge(state, { isLoading: !state.isLoading })

    case 'SET_ROUTE':
      setTimeout( () => VK.callMethod("resizeWindow", 795, document.getElementById('wrapper').offsetHeight), 100);
      return merge(state, { route: action.route })

    default:
      return state
  }
}

export default selector
