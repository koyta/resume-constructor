import React, { Component } from 'react'
import LoginComponent from '../../components/login'
import { inject, observer } from 'mobx-react'

class Login extends Component {

  // login = () => {
  //   const { location, push, goBack } = this.props.routing;
  //   push('/login')
  // }

  render () {
    return (
      <LoginComponent
        // user={this.props.user}
        // routing={this.props.routing}
        // loginClick={this.loginClick}
      />
    )
  }
}

export default inject('routing', 'user')(observer(Login))