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
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4Container from './Step4Container';

@inject('routing', 'user', 'app', 'create')
@observer
class CreateResume extends Component {
  static propTypes = {
    app: PropTypes.shape({
      setScene: PropTypes.func,
    }).isRequired,
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      createResume: PropTypes.func,
      statusCode: PropTypes.number,
      isFetching: PropTypes.bool,
    }).isRequired,
    create: PropTypes.shape({
      github: PropTypes.object,
      medium: PropTypes.object,
      skills: PropTypes.object,
    }).isRequired,
  };

  state = {
    skills: [],
    error: false,
  };

  componentDidMount() {
    this.props.app.setScene('Creating');
  }

  setSkills = (value) => {
    this.setState({ skills: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const extendedValues = Object.assign(
          values,
          { github: toJS(this.props.create.github) },
          { medium: toJS(this.props.create.medium) },
          { skills: toJS(this.props.create.skills) },
        );
        console.log(extendedValues);
        this.props.user.createResume(extendedValues).then(() => {
          if (
            this.props.user.statusCode >= 200 &&
            this.props.user.statusCode < 300
          ) {
            notification.info({
              message: 'Новая анкета успешно создана!',
              description: 'Теперь вы можете найти её в своём профиле.',
            });
          } else {
            notification.error({
              message: `Ошибка ${this.props.user.statusCode}`,
            });
          }
        });
        // Если мы уже делали ошибку, когда пытались отправить форму, то вернуть
        // состояние формы в "нормальное" состояние
        if (this.state.error) {
          this.setState({ error: false });
        }
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const inputIconStyle = {
      fontSize: 20,
    };

    return (
      <div
        className="flex-row align-items-center m-auto h-100 w-100"
        style={{
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Row align="middle" justify="center" type="flex">
          <Col xs={24} sm={20} md={14} xl={12}>
            <Form hideRequiredMark={false} onSubmit={e => this.handleSubmit(e)}>
              <Step1 {...this.props} inputIconStyle={inputIconStyle} />
              <Step2 {...this.props} inputIconStyle={inputIconStyle} />
              <Step3
                {...this.props}
                skills={this.state.skills}
                setSkills={this.setSkills}
                inputIconStyle={inputIconStyle}
              />
              <Step4Container {...this.props} inputIconStyle={inputIconStyle} />
              <Row type="flex" justify="center">
                {
                  <Button
                    type={this.error ? 'danger' : 'primary'}
                    htmlType="submit"
                    icon="plus"
                    loading={this.props.user.isFetching}
                    prefixCls="create-button"
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
