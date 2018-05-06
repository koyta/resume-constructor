import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input, Layout } from 'antd';

const { Content } = Layout;

const LayoutStyles = {
  minHeight: '100vh',
};

const ContentStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const FormStyles = {
  minWidth: '30%',
  maxWidth: '80%',
};

const Login = props => (
  <Layout style={LayoutStyles}>
    <Content style={ContentStyles}>
      <h1>Sign in</h1>
      <Form onSubmit={e => props.handleSubmit(e)} style={FormStyles}>
        <Form.Item>
          <Input
            onChange={e => props.handleLoginChange(e)}
            addonBefore={<Icon type="user" />}
            disabled={props.loading}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={e => props.handlePasswordChange(e)}
            addonBefore={<Icon type="lock" />}
            disabled={props.user.isFetching}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              loading={props.user.isFetching}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >Sign in
            </Button>
            <span>If you dont have an account, <a href="/signup" >sign up now!</a>
            </span>
          </div>
        </Form.Item>
      </Form>
    </Content>
  </Layout>
);

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleLoginChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
};

export default Login;
