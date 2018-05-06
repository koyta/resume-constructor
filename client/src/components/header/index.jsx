import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Icon } from 'antd';
import cx from 'classnames';

const Header = (props) => {
  const headerClassName = cx({
    header: true,
    'header--resume': props.app.isResumeOpened,
  });
  return (
    <Layout.Header prefixCls={headerClassName}>
      <section className="header-content">
        <div>
          <button className="sider-toggler" onClick={props.app.sidebar ? props.app.closeSidebar : props.app.openSidebar}>
            <Icon type={props.app.sidebar ? 'menu-unfold' : 'menu-fold'} />
          </button>
        </div>
        <div>
          {props.user.profile && (
            <span className="header-username">
              <Icon type="user" /> {props.user.profile.login}
            </span>
          )}
          <Button
            onClick={() => props.logout()}
            loading={props.user.isFetching}
            icon="logout"
          >
            {window.innerWidth > 575 && 'Logout'}
          </Button>
        </div>
      </section>
    </Layout.Header>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isFetching: PropTypes.bool,
    profile: PropTypes.shape({
      login: PropTypes.string,
    }),
  }).isRequired,
  app: PropTypes.shape({
    sidebar: PropTypes.bool,
    closeSidebar: PropTypes.func,
    openSidebar: PropTypes.func,
    isResumeOpened: PropTypes.bool,
  }).isRequired,
};

export default Header;
