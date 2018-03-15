import React from 'react'
import { Layout, Button, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'

const Header = ({routing, user, ...props}) => {
  return <Layout.Header style={{
    backgroundColor: 'white',
    boxShadow: '0 0 1px 0 black'
  }}>
    <div className="header-content">
      <Dropdown overlay={
        <Menu>
          {/*<Menu.Item><Link to={`/resumes/${user.isAuth && user.profile.login}`}>My resumes</Link></Menu.Item>*/}
          <Menu.Item><Link to={`/profile`}>My resumes</Link></Menu.Item>
          <Menu.Item>Another menu item</Menu.Item>
        </Menu>
      }>
        <Button type="primary" icon="user"
                className='header-username'>{user.isAuth
          ? `${user.profile.login} (${user.profile.id})`
          : null}</Button>
      </Dropdown>
      <Button onClick={() => props.logout()} loading={user.isFetching}
              icon="logout">Logout</Button>
    </div>
  </Layout.Header>
}

export default Header