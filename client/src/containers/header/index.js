import React, { Component } from 'react'
import HeaderComponent from '../../components/header'
import { inject, observer } from 'mobx-react'

class Header extends Component {

  loginClick = () => {
    this.props.routing.push('/login')
  }

  render () {
    return (
      <HeaderComponent
        user={this.props.user}
        routing={this.props.routing}
        loginClick={this.loginClick}
      />
    )
  }
}

export default inject('routing', 'user')(observer(Header))