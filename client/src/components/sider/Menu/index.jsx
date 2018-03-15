import React from 'react'
import { Layout, Menu as AntMenu, Icon } from 'antd'

const Menu = ({routing, user, ...props}) => {
  return <Layout.Sider
    collapsible={true}
    collapsed={props.collapsed}
    onCollapse={props.onCollapse}>
    <div className="App-logo"><span>logo</span></div>
    {user.isAuth &&
    <AntMenu theme="dark" defaultSelectedKeys={['1']}>
      <AntMenu.Item key={1}>
        <Icon type="user"/>
        <span>Личная информация</span>
      </AntMenu.Item>
      <AntMenu.Item key={2}>
        <Icon type="profile"/>
        <span>Кратко о себе</span>
      </AntMenu.Item>
      <AntMenu.Item key={3}>
        <Icon type="github"/>
        <span>Анализ GitHub</span>
      </AntMenu.Item>
      <AntMenu.Item key={4}>
        <Icon type="star-o"/>
        <span>Навыки</span>
      </AntMenu.Item>
    </AntMenu>}
  </Layout.Sider>
}

export default Menu