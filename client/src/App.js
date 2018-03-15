import React, { Component } from 'react'
import AccountRowContainer from './containers/content/AccountRow'
import Header from './containers/header'
import './App.css'
import 'antd/dist/antd.css'
import { Col, Icon, Input, Layout, Menu } from 'antd'
import TipPanel from './containers/content/TipPanel/'
import Profile from './components/content/Profile'
import { inject, observer } from 'mobx-react'
import { Route, Switch } from 'react-router'
import ResumeView from './components/content/ResumeView'

const {Content, Sider} = Layout
const {Item} = Menu

@inject('routing','user')
@observer
class App extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    this.setState({collapsed})
  }

  removeRow = (e) => {
    const rows = document.querySelectorAll('.panel__body-row')
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      let buttonInRow = row.getElementsByTagName('button')
      if (buttonInRow[0] === e.target) {
        rows[i].remove()
        return
      } else {
        console.log('next')
      }
    }
  }

  render () {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <div className="App-logo"><span>logo</span></div>
          {this.props.user.isAuth &&
          <Menu theme="dark" defaultSelectedKeys={['1']}>
            <Item key={1}>
              <Icon type="user"/>
              <span>Личная информация</span>
            </Item>
            <Item key={2}>
              <Icon type="profile"/>
              <span>Кратко о себе</span>
            </Item>
            <Item key={3}>
              <Icon type="github"/>
              <span>Анализ GitHub</span>
            </Item>
            <Item key={4}>
              <Icon type="star-o"/>
              <span>Навыки</span>
            </Item>
          </Menu>}
        </Sider>
        <Layout>
          <Header/>
          <Content style={{padding: 20}}>
            <Switch>
              <Route exact path="/profile" component={Profile}/>
              <Route path="/resume/:resumesId" component={ResumeView}/>
            </Switch>
            {/*<div className="wrapper">*/}
              {/*<TipPanel/>*/}
              {/*<div className="panel panel--white">*/}
                {/*<div className="panel__body">*/}
                  {/*<div className="form">*/}
                    {/*<Input.Group>*/}
                      {/*<Col span={12}>*/}
                        {/*<Input placeholder="Иван" size="large"/>*/}
                      {/*</Col>*/}
                      {/*<Col span={12}>*/}
                        {/*<Input placeholder="Иванов" size="large"/>*/}
                      {/*</Col>*/}
                    {/*</Input.Group>*/}
                    {/*<br/>*/}
                    {/*<Input placeholder="React-разработчик" size="large"/>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}

              {/*<div className="panel panel--white">*/}
                {/*<div className="panel__heading">*/}
                  {/*<span>Внешние ресурсы, которые помогут работодателю узнать о Вас больше</span>*/}
                  {/*/!* <span className="push--right"><Button size="small" onClick={() => this.addRow()}>Добавить ссылку</Button></span> *!/*/}
                {/*</div>*/}
                {/*<div className="panel__body">*/}
                  {/*<div className="form">*/}

                    {/*<AccountRowContainer icon="github" placeholder="username"/>*/}
                    {/*<AccountRowContainer icon="inbox"*/}
                                         {/*placeholder="mail@inbox.com"/>*/}
                    {/*<AccountRowContainer icon="medium" placeholder="@username"/>*/}

                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}

            {/*</div>*/}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
