import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Form, notification } from "antd";
import RegistrationComponent from "../../components/signup";
// import UserStore from '../../stores/userStore';
import {
  AntdFormPropTypes,
  RoutingStorePropTypes,
  UserStorePropTypes
} from "../../types/PropTypeValues";

@inject("routing", "user")
@observer
class Registration extends Component {
  static propTypes = {
    user: UserStorePropTypes.isRequired,
    form: AntdFormPropTypes.isRequired,
    routing: RoutingStorePropTypes.isRequired
  };

  openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
      message: msg || type,
      description: desc
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { user, routing, form } = this.props;
    form.validateFieldsAndScroll(async (error, values) => {
      if (error) {
        console.error(error);
      } else {
        const formatedValues = Object.assign({}, values);
        formatedValues.date_of_birth = values.date_of_birth.unix();
        await user.registration(formatedValues);
        if (user.statusCode === 201) {
          this.openNotificationWithIcon(
            "success",
            "Аккаунт успешно создан!",
            "Теперь вы можете зайти с новым логином и паролем."
          );
        } else if (user.statusCode === 409) {
          this.openNotificationWithIcon(
            "warning",
            "Ошибка при создании",
            "Пользователь с таким логином уже существует"
          );
        } else if (user.statusCode === 500) {
          this.openNotificationWithIcon(
            "error",
            "Непредвиденная ошибка",
            "Произошла непредвиденная ошибка. Проблема на стороне сервера."
          );
        }
      }
    });
    if (user.statusCode === 201) {
      routing.go("/login");
    }
  };

  render() {
    return (
      <React.Fragment>
        <RegistrationComponent
          form={this.props.form}
          routing={this.props.routing}
          handleSubmit={this.handleSubmit}
          loading={this.props.user.isFetching}
        />
      </React.Fragment>
    );
  }
}

const wrappedComponent = Form.create({
  onValuesChange: (props, changedValues, allValues) =>
    console.info(changedValues, allValues)
})(Registration);

export default wrappedComponent;
