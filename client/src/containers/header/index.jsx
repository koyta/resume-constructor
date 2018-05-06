import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import HeaderComponent from '../../components/header';

@inject('routing', 'user', 'app')
@observer
class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
    app: PropTypes.shape({
      closeSidebar: PropTypes.func.isRequired,
      openSidebar: PropTypes.func.isRequired,
      sidebar: PropTypes.bool.isRequired,
    }).isRequired,
    routing: PropTypes.shape({
      history: PropTypes.shape({
        go: PropTypes.func,
      }),
    }).isRequired,
  }

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
