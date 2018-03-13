import React from 'react'
import { Layout, Button } from 'antd'

const Header = (routing, user, ...props) => {
  return <Layout.Header style={{
    backgroundColor: 'white',
    boxShadow: '0 0 1px 0 black'
  }}>
    <span className='header-username'>{`${user.profile.login}(${user.profile.id})`}</span>
  </Layout.Header>
}

export default Header