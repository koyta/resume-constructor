import React from 'react';
import { Layout, Menu as AntMenu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Menu = ({ routing, user, ...props }) => (
  <Layout.Sider
    breakpoint="xl"
    collapsedWidth={0}
    // onCollapse={(collapsed, type) => { console.log(collapsed, type);}}
  >
    <div className="App-logo"><span>logo</span></div>
    <AntMenu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <AntMenu.Item key={1}>
        <Icon type="user" /><span>Личная информация</span>
        <Link to="/personal" />
      </AntMenu.Item>
      <AntMenu.Item key={2}>
        <Icon type="profile" /><span>Кратко о себе</span>
        <Link to="/about-me" />
      </AntMenu.Item>
      <AntMenu.Item key={3}>
        <Icon type="github" /><span>Анализ GitHub</span>
        <Link to="/github-analyser" />
      </AntMenu.Item>
      <AntMenu.Item key={4}>
        <Icon type="star-o" /><span>Навыки</span>
        <Link to="/skills" />
      </AntMenu.Item>
    </AntMenu>
  </Layout.Sider>);

export default Menu;
