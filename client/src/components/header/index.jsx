import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject('app')
@observer
class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      isFetching: PropTypes.bool,
      profile: PropTypes.shape({
        login: PropTypes.string,
      }),
    }).isRequired,
    app: PropTypes.shape({
      isResumeOpened: PropTypes.bool,
      scene: PropTypes.string,
    }).isRequired,
  };

  render() {
    const headerClassName = cx('header', {
      'header--resume': this.props.app.isResumeOpened,
    });

    return (
      <Layout.Header prefixCls={headerClassName}>
        <section className="header-content">
          <div className="header-logo-container">
            <Link to="/">
              <div className="header-logo-bg">
                <div className="header-logo-name">IT Analytics</div>
              </div>
            </Link>
            <div className="header-logo-scene">{this.props.app.scene || 'Профиль'}</div>
          </div>
          <div className="header-controls">
            {this.props.user.profile && <span className="header-username">{this.props.user.profile.login}</span>}
            <Button
              onClick={() => this.props.logout()}
              loading={this.props.user.isFetching}
              icon="logout"
              className="header-logout-btn"
            >
              {window.innerWidth > 575 && 'Выход'}
            </Button>
          </div>
        </section>
      </Layout.Header>
    );
  }
}

export default Header;
