import React, { Component } from 'react'
import SinginComponent from '../../components/signup'
import { inject, observer } from 'mobx-react'

@inject('routing', 'user')
@observer
class Signin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { user, routing } = this.props
    await user.registration(
      this.state.login,
      this.state.password,
    )
    if (user.statusCode === 200) {
      routing.go('/login')
    }
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
      />
    )
  }
}

export default Signin