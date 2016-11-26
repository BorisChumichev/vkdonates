import $ from 'jquery'

export const sayBye = payload => {
  return {
    type: 'BYE',
    payload
  }
}

export const updateWallet = wallet => {
  return {
    type: 'UPDATE_WALLET',
    wallet
  }
}

export const setRoute = route => {
  return {
    type: 'SET_ROUTE',
    route
  }
}

export const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING',
  }
}

export const configureApp = (data) => {
  return dispatch => {
    dispatch(toggleLoading())

    const handle = () => {
      dispatch(toggleLoading())
      dispatch(updateWallet(data.wallet))
      dispatch(setRoute('main'))
    }
    
    $.ajax({
      type: 'POST',
      url: '/configure',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: "application/json",
      success: handle
    })
  }
}
