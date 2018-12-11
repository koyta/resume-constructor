import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import LoginComponent from "../../components/login";

class Login extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isAuth: PropTypes.bool,
      isFetching: PropTypes.bool
    }).isRequired,
    routing: PropTypes.shape({
      history: PropTypes.object
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      error: false
    };
  }

  componentWillMount() {
    if (this.props.user.isAuth) {
      this.props.routing.history.push("/login");
    }
  }

  handleSubmit = async e => {
    const { user, routing } = this.props;
    e.preventDefault();
    await user.authentication(this.state.login, this.state.password);
    if (user.statusCode >= 200 && user.statusCode < 300) {
      routing.history.go("/");
    } else {
      this.setState({
        error: true
      });
    }
  };

  handleLoginChange = e => {
    if (this.state.error) {
      this.setState({ error: false });
    }
    this.setState({
      login: e.target.value
    });
  };

  handlePasswordChange = e => {
    if (this.state.error) {
      this.setState({ error: false });
    }
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <LoginComponent
        user={this.props.user}
        routing={this.props.routing}
        loginClick={this.login}
        handleLoginChange={this.handleLoginChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
        login={this.state.login}
        password={this.state.password}
        loading={this.props.user.isFetching}
        isError={this.state.error}
      />
    );
  }
}

export default inject("routing", "user")(observer(Login));
