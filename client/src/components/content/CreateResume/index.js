import React, { Component } from "react";
import {
  Checkbox,
  Input,
  notification,
  Form,
  DatePicker,
  Calendar,
  Icon,
  Tooltip,
  Steps,
  Row,
  Col,
  Timeline,
  Rate,
  Select,
  Button,
  Divider
} from "antd";
import { inject, observer } from "mobx-react";
import { observable } from 'mobx'

const Step = Steps.Step;

const CreateProgressSteps = props => {
  return (
    <Steps current={props.current}>
      <Step title="Основное"/>
      <Step title="Навыки" />
      <Step title="Опыт" />
    </Steps>
  );
};

@inject("routing", "user")
@observer
class CreateResume extends Component {

  @observable error = false

  state = {
    current: 0
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.user.createResume(values)
          .then(() => {notification.info({
            message: 'Новая анкета успешно создана!',
            description: "Теперь вы можете найти её в своем профиле."
          })})
        // Если мы уже делали ошибку, когда пытались отправить форму, то вернуть состояние формы в "нормальное" состояние
        if (this.error) this.error = false
      } else {
        this.error = true;
      }
    });
  };

  render() {
    const { user, routing, form } = this.props;
    const { getFieldDecorator } = form;

    const InputIcon = {
      fontSize: 20
    };

    return (
      <div
        className="flex-row align-items-center m-auto w-75"
        style={{
          position: "relative",
          overflowY: "auto"
        }}
      >
        <CreateProgressSteps current={this.state.current} />
        <div className="mb-5"/>
        <Divider orientation="left">Главная информация</Divider>
        <Form layout="vertical" onSubmit={e => this.handleSubmit(e)} hideRequiredMark={false} prefixCls="form w-50 m-auto">
          <Button type="dashed" shape="circle" icon="left" size="large" className="navigate prev"/>
          <Button type="dashed" shape="circle" icon="right" size="large" className="navigate next"/>
          <Form.Item label="Профессия">
            {getFieldDecorator("profession", {
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "Зачем вам резюме без профессии?"
                }
              ]
            })(<Input type="text" placeholder="Например, работяга с завода" />)}
          </Form.Item>
          <Form.Item label="E-mail для связи">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Введенное значение не похоже на E-mail!"
                },
                {
                  required: true,
                  message: "Пожалуйста, укажите ваш E-mail!"
                }
              ]
            })(<Input addonBefore={<Icon type="inbox" style={InputIcon} />} />)}
          </Form.Item>
          <Form.Item label="Номер телефона для связи">
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "Пожалуйста, укажите ваш номер телефона!"
                }
              ]
            })(
              <Input
                prefix="+"
                addonBefore={<Icon type="phone" style={InputIcon} />}
                placeholer="12345678900"
              />
            )}
          </Form.Item>
          <Input.Group>
            <Form.Item>
              <Input addonBefore={<Icon type="github" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="medium" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="facebook" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="behance" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="linkedin" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="codepen" style={InputIcon} />} />
            </Form.Item>
          </Input.Group>
          <Button type={this.error ? 'danger' : 'primary'} size="large" htmlType="submit" icon="form" loading={this.props.user.isFetching}>Create resume</Button>
        </Form>
      </div>
    );
  }
}

CreateResume = Form.create({})(CreateResume);

export default CreateResume;
