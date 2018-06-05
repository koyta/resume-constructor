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
        user={this.props.user}
        routing={this.props.routing}
        logout={this.logout}
      />
    );
  }
}

export default Header;
