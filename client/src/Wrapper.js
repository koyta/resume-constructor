import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter } from 'react-router'

import App from './App'
import Login from './containers/login'

class Wrapper extends Component {
  // componentWillMount () {
  //   this.checkLocation(this.props)
  // }
  //
  // componentWillUpdate (nextProps) {
  //   this.checkLocation(nextProps)
  // }
  //
  // checkLocation () {
  //
  //   const { history, location } = this.props.routing
  //   if (!this.props.user.isAuth && location.pathname !== '/login') {
  //     history.push('/login')
  //   }
  //   if (this.props.user.isAuth && location.pathname === '/login') {
  //     history.push('/')
  //   }
  // }

  render () {
    const { user } = this.props
    if (!user.isAuth) {
      return <Login/>
    }
    else {
      return <Route exact path="/" component={App}/>
    }
  }
}

export default inject('routing', 'user')(observer(Wrapper))