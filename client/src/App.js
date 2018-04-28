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
import AuthSocial from './components/content/AuthSocial'
import AuthSuccess from './components/content/AuthSuccess';


const {Content} = Layout

@inject('routing','user', 'app')
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

    const contentStyle = {
      padding: '3.5%'
    }

    return (
      <Layout style={{minHeight: '100vh'}}>
        {/* <MenuComponent /> */}
        <Layout>
          <Header/>
          <Route path="/resume/view/:resumesId" component={ResumeView}/>
          {!this.props.app.isResumeOpened && <Content style={contentStyle}>
            <Switch>
              <Route exact path="/" component={WelcomePage}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/personal" component={PersonalInfo}/>
              <Route exact path="/resume/new" component={CreateResume}/>
              <Route exact path="/auth" component={AuthSocial}/>
            </Switch>
          </Content>}
        </Layout>
      </Layout>
    )
  }
}

export default App
