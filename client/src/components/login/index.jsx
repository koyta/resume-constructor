import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, Input, Col, Spin } from "antd";
import styled from "styled-components";
import cx from "classnames";

const containerLayout = {
  xs: 22,
  sm: 20,
  md: 16,
  lg: 12,
  xl: 8,
  xxl: 6
};

const FormHeading = styled.h1`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: white;
  margin-bottom: 1rem;
`;

const Login = ({
  loading,
  isError,
  handleSubmit,
  handleLoginChange,
  handlePasswordChange
}) => {
  const containerClass = cx("login-container", { loading });
  return (
    <div className="login-container">
      <div className={containerClass}>
        <Col {...containerLayout}>
          <FormHeading>Вход в профиль</FormHeading>
          {isError && (
            <p className="login-form-error">Проверьте корректность данных.</p>
          )}
          <Form onSubmit={e => handleSubmit(e)} prefixCls="login">
            <Form.Item label="Имя пользователя" prefixCls="login">
              <Input
                onChange={e => handleLoginChange(e)}
                prefixCls="input-custom"
              />
            </Form.Item>
            <Form.Item label="Пароль" prefixCls="login">
              <Input
                onChange={e => handlePasswordChange(e)}
                type="password"
                prefixCls="input-custom"
              />
            </Form.Item>
            <Form.Item>
              <div className="login-form-last">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  prefixCls="input-custom"
                >
                  Sign in
                </Button>
                <span className="login-form-tip">
                  Нет аккаунта? <Link to="/signup">Создайте прямо сейчас!</Link>
                </span>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </div>
      {loading && (
        <Spin
          className="login-form-loading-wrapper"
          spinning={loading}
          tip="Вход..."
        />
      )}
    </div>
  );
};

Login.propTypes = {
  handleLoginChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Login;
