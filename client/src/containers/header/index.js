import React, { Component } from 'react'
import HeaderComponent from '../../components/header'
import { inject, observer } from 'mobx-react'

class Header extends Component {

  logout = () => {
    const { user, routing } = this.props
    user.logout()
    routing.history.go('/login')
  }

  render () {
    return (
      <HeaderComponent
        user={this.props.user}
        routing={this.props.routing}
        logout={this.logout}
      />
    )
  }
}

export default inject('routing', 'user')(observer(Header))