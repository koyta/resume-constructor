import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import HeaderComponent from '../../components/header';

@inject('routing', 'user', 'app')
@observer
class Header extends Component {
  logout = () => {
    const { user, routing } = this.props;
    user.logout();
    routing.history.go('/login');
  }

  render() {
    return (
      <HeaderComponent
        app={this.props.app}
        user={this.props.user}
        routing={this.props.routing}
        logout={this.logout}
        closeSidebar={this.props.app.closeSidebar}
        openSidebar={this.props.app.openSidebar}
        sidebar={this.props.app.sidebar}
      />
    );
  }
}

export default Header;
