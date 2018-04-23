import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'
import { observer, inject } from 'mobx-react'

@inject('routing') @observer
class AuthSocial extends Component {

  componentDidMount() {
    console.log(this.props.routing);
  }

  onClick = async () => {
    await fetch('/auth/github', {
      mode: 'no-cors'
    })
    const url = '/auth/github';
    const name = 'github_login';
    const specs = 'width=500,height=500';
    window.open(url, name, specs);
  }

  render() {

    return (
      <section className="auth-social">
        <Button icon={'github'} onClick={this.onClick} type="primary">Login with GitHub</Button>
        <a href="http://127.0.0.1:3000/auth/github">Login with GitHub</a>
      </section>
    )
  }
}

export default AuthSocial
