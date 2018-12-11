import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Icon, Input, DatePicker, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import {
  AntdFormPropTypes,
  RoutingStorePropTypes
} from "../../types/PropTypeValues";

@inject("routing", "user")
@observer
class RegistrationComponent extends React.Component {
  static propTypes = {
    routing: RoutingStorePropTypes.isRequired,
    form: AntdFormPropTypes.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    const { form } = this.props;

    const containerLayout = {
      sm: 24,
      md: 16,
      xl: 12
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <Row
        type="flex"
        align="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Col {...containerLayout} style={{ margin: "auto 0" }}>
          <FormHeading>Регистрация</FormHeading>
          <Form
            hideRequiredMark={false}
            onSubmit={e => this.props.handleSubmit(e)}
            layout="horizontal"
          >
            {this.props.loading && (
              <Spin tip="Регистрация..." spinning={this.props.loading} />
            )}
            <Form.Item {...formItemLayout} label="Логин">
              {form.getFieldDecorator("login", {
                rules: [
                  {
                    required: true,
                    message: "Укажите имя пользователя"
                  },
                  {
                    min: 4,
                    message: "Минимальная длина - 4 символа"
                  },
                  {
                    max: 18,
                    message: "Максимальная длина - 18 символов"
                  }
                ]
              })(
                <Input
                  // onChange={e => this.props.handleLoginChange(e)}
                  addonBefore={<Icon type="user" />}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Пароль">
              {form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]
              })(
                <Input
                  // onChange={e => this.props.handlePasswordChange(e)}
                  addonBefore={<Icon type="lock" />}
                  type="password"
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Имя">
              {form.getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    message: "First name is required."
                  }
                ]
              })(<Input type="text" label="First name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Фамилия">
              {form.getFieldDecorator("secondname", {
                rules: [
                  {
                    required: true,
                    message: "Second name is required."
                  }
                ]
              })(<Input type="text" label="Second name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Дата рождения">
              {form.getFieldDecorator("date_of_birth", {
                rules: [
                  {
                    required: true,
                    message:
                      "Укажите вашу дату рождения. Для многих работодателей возраст сотрудника очень важен."
                  }
                ]
              })(
                <DatePicker
                  showToday={false}
                  style={{ width: "100%" }}
                  format="DD MMMM YYYY"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Row type="flex" justify="space-between">
                <Col sm={10} md={8} lg={6}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Готово
                  </Button>
                </Col>
                <Col sm={14} md={16} lg={18}>
                  <span style={{ textAlign: "right" }}>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                  </span>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const FormHeading = styled.h1`
  font-size: 18px;
  font-weight: 400px;
  text-align: center;
  margin-bottom: 1rem;
`;

export default RegistrationComponent;
