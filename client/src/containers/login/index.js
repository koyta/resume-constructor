import React, { Component } from 'react'
import LoginComponent from '../../components/login'
import { inject, observer } from 'mobx-react'

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: ''
    }
  }

  componentWillMount() {
    if(this.props.user.isAuth) {
      this.props.routing.history.push('/login')
    }
  }

  handleSubmit = async (e) => {
    const { user, routing } = this.props
    e.preventDefault()
    await user.authentication(
      this.state.login,
      this.state.password
    )
    console.log(`${this.state.login} ${this.state.password} ${user.statusCode}`)
    if (user.statusCode >= 200 && user.statusCode < 300) {
      routing.history.go('/')
    }
  }

  handleLoginChange = e => {
    this.setState({
      login: e.target.value
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  render () {
    return (
      <LoginComponent
        user={this.props.user}
        routing={this.props.routing}
        loginClick={this.login}
        handleLoginChange={this.handleLoginChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
        login={this.state.login}
        password={this.state.password}
        loading={this.props.user.isFetching}
      />
    )
  }
}

export default inject('routing', 'user')(observer(Login))