import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import 'antd/dist/antd.css';
import Profile from './components/content/Profile';
import CreateResume from './components/content/CreateResume';
import ResumeView from './containers/content/ResumeView';
import PersonalInfo from './containers/blocks/PersonalInfo';
import WelcomePage from './components/blocks/WelcomePage';
import AuthSocial from './components/content/AuthSocial';
import Header from './containers/header';
import './App.css';

const { Content } = Layout;

@inject('routing', 'user', 'app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.shape({

    }).isRequired,
  }

  removeRow = (e) => {
    const rows = document.querySelectorAll('.panel__body-row');
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const buttonInRow = row.getElementsByTagName('button');
      if (buttonInRow[0] === e.target) {
        rows[i].remove();
        return;
      }
    }
  }

  render() {
    const contentStyle = {
      padding: '3.5%',
    };

    const { app } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <aside className={`sider${!app.sidebar ? ' sider-collapsed' : ''}`}>
          <div className="sider-toggler-container">
            <button className="sider-toggler" onClick={app.sidebar ? app.openSidebar : app.closeSidebar}>
              <Icon type={!app.sidebar ? 'menu-unfold' : 'menu-fold'} />
            </button>
          </div>
          <nav className="sider-nav">
            <div className="sider-nav-item"><NavLink to="/profile">Профиль</NavLink></div>
            <div className="sider-nav-item"><NavLink to="/resume/new">Создать анкету</NavLink></div>
          </nav>
        </aside>
        <Layout>
          <Header />
          <Route path="/resume/view/:resumesId" component={ResumeView} />
          {!app.isResumeOpened &&
          <Content style={contentStyle} className="slide">
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/personal" component={PersonalInfo} />
              <Route exact path="/resume/new" component={CreateResume} />
              <Route exact path="/auth" component={AuthSocial} />
            </Switch>
          </Content>}
        </Layout>
      </Layout>
    );
  }
}

export default App;
