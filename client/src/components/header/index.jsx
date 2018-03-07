import React from 'react'
import { Layout, Button } from 'antd'

const Header = (routing, user, ...props) => {
  return <Layout.Header style={{
    backgroundColor: 'white',
    boxShadow: '0 0 1px 0 black'
  }}>
    {user.isAuth && <span>{user.firstname} {user.secondname}</span>}
    {!user.isAuth && <Button type="primary">Sign in</Button>}
    {!user.isAuth && <Button onClick={() => {
      routing.history.push('/login')
    }}>Log in</Button>}

  </Layout.Header>
}

export default Header