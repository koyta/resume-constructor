import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter } from 'react-router'

import App from './App'
import Login from './containers/login'
import Signup from './containers/signup'

@withRouter
@inject('routing', 'user') @observer
class Wrapper extends Component {

  componentWillMount () {
    this.checkLocation(this.props)
  }

  componentWillUpdate (nextProps) {
    this.checkLocation(nextProps)
  }

  checkLocation (props) {
    const { location, push } = props.routing
    const { isAuth } = props.user
    if (isAuth && (location.pathname === '/login' || location.pathname === '/signup')) {
      push('/')
    } else if (!isAuth && (location.pathname !== '/signup' && location.pathname !== '/login')) {
      push('/login')
    }
  }

  render () {
    return [
      <Route exact path={'/'} component={App} key={0}/>,
      <Route path={'/login'} component={Login} key={1}/>,
      <Route path={'/signup'} component={Signup} key={2}/>,
    ]
  }
}

export default Wrapper