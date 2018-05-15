import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Icon, Input, Row, Col, Spin } from 'antd';
import styled from 'styled-components';

const containerLayout = {
  sm: 24,
  md: 16,
  xl: 12,
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const FormHeading = styled.h1`
  font-size: 18px;
  font-weight: 400px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Login = props => (
  <Row type="flex" align="center" justify="center" style={{ height: '100vh', position: 'relative' }}>
    {props.loading && <Spin spinning={props.loading} tip="Вход..." />}
    <Col {...containerLayout} style={{ margin: 'auto 0' }}>
      <FormHeading>Вход в профиль</FormHeading>
      {props.isError && <p>Проверьте корректность данных.</p>}
      <Form onSubmit={e => props.handleSubmit(e)}>
        <Form.Item {...formItemLayout} label="Имя пользователя">
          <Input
            onChange={e => props.handleLoginChange(e)}
            addonBefore={<Icon type="user" />}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Пароль">
          <Input
            onChange={e => props.handlePasswordChange(e)}
            addonBefore={<Icon type="lock" />}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-between">
            <Col sm={10} md={8} lg={6}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >Sign in
              </Button>
            </Col>
            <Col sm={14} md={16} lg={18}>
              <span style={{ textAlign: 'right' }}>Нет аккаунта? <Link to="/signup">Создайте прямо сейчас!</Link></span>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);

Login.propTypes = {
  handleLoginChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
