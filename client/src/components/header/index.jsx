import React from 'react'
import { Layout, Button } from 'antd'

const Header = (props) => {
  return <Layout.Header style={{
    backgroundColor: 'white',
    boxShadow: '0 0 1px 0 black'
  }}>
    <Button type="primary">Sign in</Button><Button onClick={() => this.props.loginClick()}>Log in</Button>
  </Layout.Header>
}

export default Header