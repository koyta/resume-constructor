import React, { Component } from "react";
import { Layout } from "antd";
import { inject, observer } from "mobx-react";
import { Route, Switch } from "react-router";
import ResumeView from "./containers/content/ResumeView";
import WelcomePage from "./components/blocks/WelcomePage";
import CreateResume from "./components/content/CreateResume";
import Header from "./containers/header";

import "./App.css";
import "antd/dist/antd.css";

const { Content } = Layout;

@inject("routing", "user", "app")
@observer
class App extends Component {
  render() {
    return (
      <Layout className="main-layout main-gradient">
        <Layout className="main-gradient">
          <Header />
          <Content className="main-content">
            <Route path="/resume/view/:resumesId" component={ResumeView} />
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/resume/new" component={CreateResume} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
