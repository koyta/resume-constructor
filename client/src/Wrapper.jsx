import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router';

import App from './App';
import Login from './containers/login';
import Signup from './components/signup';

@withRouter
@inject('routing', 'user') @observer
class Wrapper extends Component {
  static propTypes = {
    routing: PropTypes.shape({
      location: PropTypes.string,
      push: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      isAuth: PropTypes.bool,
    }).isRequired,
  }

  componentWillMount() {
    this.checkLocation();
  }

  componentWillUpdate(nextProps) {
    this.checkLocation(nextProps);
  }

  checkLocation() {
    const { location, push } = this.props.routing;
    const { isAuth } = this.props.user;
    if (isAuth && (location.pathname === '/login' || location.pathname === '/signup')) {
      push('/');
    } else if (!isAuth && (location.pathname !== '/signup' && location.pathname !== '/login')) {
      push('/login');
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={App} />
      </Switch>
    );
  }
}

export default Wrapper;
