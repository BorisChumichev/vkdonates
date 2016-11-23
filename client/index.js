import 'index.sass'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import app from 'reducers/app'
import App from 'smart/app'
import createLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

const logger = createLogger()
let store = createStore(
  app,
  applyMiddleware(ReduxThunk, logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
