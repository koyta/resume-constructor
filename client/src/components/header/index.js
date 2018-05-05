import React from 'react';
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
          <button className="sider-toggler" onClick={props.sidebar ? props.closeSidebar : props.openSidebar}>
            <Icon type={props.sidebar ? 'menu-unfold' : 'menu-fold'} />
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

export default Header;
