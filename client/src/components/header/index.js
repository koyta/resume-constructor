import React from 'react'
import { Layout, Button, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'

const headerStyle = {
  backgroundColor: 'white',
  boxShadow: '0 0 1px 0 black'
}

const Header = ({routing, user, ...props}) => {
  return (
    <Layout.Header style={headerStyle}>
      <section className="header-content">
        <Dropdown overlay={
          <Menu>
            <Menu.Item><Link to={'/resume/new'}>Создать резюме</Link></Menu.Item>
            <Menu.Item><Link to={`/profile`}>Мои резюме</Link></Menu.Item>
            <Menu.Item><Link to={`/auth`}>Связать аккаунты</Link></Menu.Item>
          </Menu>
        }>
          <Button type="primary" icon="user"
                  className='header-username'>{`${user.profile.login} (${user.profile.id})`}</Button>
        </Dropdown>
        <Button onClick={() => props.logout()} loading={user.isFetching}
                icon="logout">Logout</Button>
      </section>
    </Layout.Header>
  )
}

export default Header
