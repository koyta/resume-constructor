import React, { Component } from 'react'
import SinginComponent from '../../components/signup'
import { inject, observer } from 'mobx-react'

class Singin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.user.registration(
      this.state.login,
      this.state.password,
    )
    console.log(this.state.login + this.state.password)
  }

  handleLoginChange = e => {
    this.setState({
      login: e.target.value,
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
    })
  }

  render () {
    return (
      <SinginComponent
        user={this.props.user}
        routing={this.props.routing}
        loginClick={this.login}
        handleLoginChange={this.handleLoginChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
        login={this.state.login}
        password={this.state.password}
        loading={this.state.loading}
      />
    )
  }
}

export default inject('routing', 'user')(observer(Singin))