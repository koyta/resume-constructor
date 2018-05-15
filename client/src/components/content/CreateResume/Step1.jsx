import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Form } from 'antd';

class Step1 extends Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
    }).isRequired,
    inputIconStyle: PropTypes.shape({}).isRequired,
  }

  componentDidMount() {}

  render() {
    const { inputIconStyle } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="block">
        <h2>Основная информация</h2>
        <Form.Item label="Профессия">
          {getFieldDecorator('profession', {
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Зачем вам резюме без профессии?',
              },
            ],
          })(<Input
            addonBefore={<Icon
              type="rocket"
              style={
              inputIconStyle
            }
            />}
            type="text"
            placeholder="Например, работяга с завода"
          />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Введенное значение не похоже на E-mail!',
              }, {
                required: true,
                message: 'Пожалуйста, укажите ваш E-mail!',
              },
            ],
          })(<Input addonBefore={<Icon type="inbox" style={inputIconStyle} />} />)}
        </Form.Item>
        <Form.Item label="Номер телефона">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, укажите ваш номер телефона!',
              },
            ],
          })(<Input
            prefix="+"
            addonBefore={<Icon
              type="phone"
              style={
              inputIconStyle
            }
            />}
            placeholer="79315413241"
          />)}
        </Form.Item>
      </div>
    );
  }
}

export default Step1;

