import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AccountRowContainer from './containers/content/AccountRow'
import Header from './containers/header'
import MenuComponent from './components/sider/Menu'
import './App.css'
import 'antd/dist/antd.css'
import { Col, Icon, Input, Layout, Menu } from 'antd'
import TipPanel from './containers/content/TipPanel/'
import Profile from './components/content/Profile'
import { inject, observer } from 'mobx-react'
import { Route, Switch } from 'react-router'
import CreateResume from './components/content/CreateResume'
import ResumeView from './containers/content/ResumeView'
import PersonalInfo from './containers/blocks/PersonalInfo'
import WelcomePage from './components/blocks/WelcomePage'


const {Content} = Layout

@inject('routing','user')
@observer
class App extends Component {

  removeRow = (e) => {
    const rows = document.querySelectorAll('.panel__body-row')
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      let buttonInRow = row.getElementsByTagName('button')
      if (buttonInRow[0] === e.target) {
        rows[i].remove()
        return
      }
    }
  }

  render () {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <MenuComponent />
        <Layout>
          <Header/>
          <Content style={{padding: 20}}>
            <Switch>
              <Route exact path="/" component={WelcomePage}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/personal" component={PersonalInfo}/>
              <Route exact path="/resume/new" component={CreateResume}/>
              <Route path="/resume/:resumesId" component={ResumeView}/>
            </Switch>
            {/*<div className="wrapper">*/}
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
