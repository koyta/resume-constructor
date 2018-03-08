import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter } from 'react-router'

import App from './App'
import Login from './containers/login'

@withRouter
@inject('routing', 'user') @observer
class Wrapper extends Component {
  componentWillMount () {
    this.checkLocation(this.props)
  }

  componentWillUpdate (nextProps) {
    this.checkLocation(nextProps)
  }

  checkLocation () {

    const { history, location } = this.props.routing
    if (!this.props.user.isAuth && location.pathname !== '/login') {
      history.push('/login')
    }
    if (this.props.user.isAuth && location.pathname === '/login') {
      history.push('/')
    }
  }

  render () {
    return [
      <Route exact path={'/'} component={App} key={0}/>,
      <Route path={'/login'} component={Login} key={1}/>
    ]
  }
}

export default Wrapper