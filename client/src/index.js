import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Route, Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import UserStore from './stores/userStore'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const userStore = new UserStore()

const stores = {
  user: userStore,
  routing: routingStore
}

const history = syncHistoryWithStore(browserHistory, routingStore)

render(
  <Provider {...stores}>
    <Router history={history}>
      <Route exact path='/' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
