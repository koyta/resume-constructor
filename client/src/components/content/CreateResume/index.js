import React, { Component } from "react";
import {
  Checkbox,
  Input,
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
  Button
} from "antd";
import { inject, observer } from "mobx-react";

const Step = Steps.Step;

const CreateProgressSteps = props => {
  return (
    <Steps size="small" current={props.current}>
      <Step title="О Вас" />
      <Step title="Навыки" />
      <Step title="Опыт" />
    </Steps>
  );
};

@inject("routing", "user")
@observer
class CreateResume extends Component {
  state = {
    current: 0
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { user, routing, form } = this.props;
    const { getFieldDecorator } = form;

    const InputIcon = {
      fontSize: 20
    };

    return (
      <div
        className="flex-row align-items-center m-auto w-50"
        style={{
          position: "relative",
          overflowY: "auto"
        }}
      >
        <CreateProgressSteps current={this.state.current} />
        <div className="mb-5"/>
        <Form
          layout="vertical"
          onSubmit={e => this.handleSubmit(e)}
          hideRequiredMark={false}
          prefixCls="form"
        >
          <Button
            type="dashed"
            shape="circle"
            icon="left"
            size="large"
            className="navigate prev"
          />
          <Button
            type="dashed"
            shape="circle"
            icon="right"
            size="large"
            className="navigate next"
          />
          <Input.Group>
            <Form.Item label="Имя" style={{ width: "50%" }}>
              {getFieldDecorator("name", {
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "Введите имя"
                  }
                ]
              })(<Input type="text" placeholder="Иван" />)}
            </Form.Item>
            <Form.Item label="Фамилия" style={{ width: "50%" }}>
              {getFieldDecorator("surname", {
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "Введите фамилию"
                  }
                ]
              })(<Input type="text" placeholder="Иванов" />)}
            </Form.Item>
          </Input.Group>
          <Form.Item
            label={
              <span>
                Дата рождения&nbsp;
                <Tooltip title="Возраст сотрудников для различных профессий играет большую роль для работодателя">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("birthdate", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message:
                    "Укажите вашу дату рождения. Для многих работодателей возраст сотрудника очень важен."
                }
              ]
            })(<DatePicker showToday={false} placeholder="1996-08-24" />)}
          </Form.Item>
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
          <Form.Item label="E-mail">
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
          <Form.Item label="Номер телефона">
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
                placeholer="79315413241"
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
              <Input addonBefore={<Icon type="twitter" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="linkedin" style={InputIcon} />} />
            </Form.Item>
            <Form.Item>
              <Input addonBefore={<Icon type="codepen" style={InputIcon} />} />
            </Form.Item>
          </Input.Group>
        </Form>
      </div>
    );
  }
}

CreateResume = Form.create({})(CreateResume);

export default CreateResume;
