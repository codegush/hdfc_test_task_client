import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import CoreLayout from './layouts/CoreLayout'
import App from './containers/App'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CoreLayout>
        <App />
      </CoreLayout>
    </ConnectedRouter>
  </Provider>,
  target
)
