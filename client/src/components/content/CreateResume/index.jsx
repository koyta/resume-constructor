import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  notification,
  Form,
  // Steps,
  Button,
  Col,
  Row,
} from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4Container from './Step4Container';

@inject('routing', 'user')
@observer
class CreateResume extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      createResume: PropTypes.func,
      statusCode: PropTypes.number,
      isFetching: PropTypes.bool,
    }).isRequired,
  }

  state = {
    current: 0,
  };

  @observable error = false

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.user.createResume(values)
            .then(() => {
              if (this.props.user.statusCode >= 200 && this.props.user.statusCode < 300) {
                notification.info({
                  message: 'Новая анкета успешно создана!',
                  description: 'Теперь вы можете найти её в своём профиле.',
                });
              } else {
                notification.error({ message: `Ошибка ${this.props.user.statusCode}` });
              }
            });
          // Если мы уже делали ошибку, когда пытались отправить форму, то вернуть
          // состояние формы в "нормальное" состояние
          if (this.error) { this.error = false; }
        } else {
          this.error = true;
        }
      });
  };

  render() {
    const inputIconStyle = {
      fontSize: 20,
    };

    return (
      <div
        className="flex-row align-items-center m-auto h-100"
        style={{
        position: 'relative',
        overflow: 'visible',
      }}
      >
        <Row align="middle" justify="center" type="flex">
          <Col xs={24} sm={20} md={14} xl={12}>
            <Form
              hideRequiredMark={false}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Step1 {...this.props} inputIconStyle={inputIconStyle} />
              <Step2 {...this.props} inputIconStyle={inputIconStyle} />
              <Step3 {...this.props} inputIconStyle={inputIconStyle} />
              <Step4Container {...this.props} inputIconStyle={inputIconStyle} />
              <Row type="flex" justify="space-between">
                {
                  this.state.current === 3 &&
                  <Button
                    type={this.error
                    ? 'danger'
                    : 'primary'}
                    htmlType="submit"
                    icon="plus"
                    loading={this.props.user.isFetching}
                  >
                    Завершить создание
                  </Button>
                }
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const createResume = Form.create({})(CreateResume);

export default createResume;
