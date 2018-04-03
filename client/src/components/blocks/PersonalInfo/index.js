import React from 'react'
import { Input, Row, Col, Form, TimePicker, Button } from 'antd'
import TipPanel from '../../content/TipPanel'
import PropTypes from 'prop-types'
import DragDrop from '../../common/dragndrop'

const FormItem = Form.Item

class PersonalInfo extends React.PureComponent {

  static propTypes = {
    form: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  static defaultProps = {
    loading: false
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <section className="personal-info container">
        <TipPanel
          icon="user"
          label="tips"
          title="Заполните только информацию, которую вы хотели бы показать в своем резюме. Оставьте остальные поля пустыми."
          heading="Персональная информация"
        />
        <Row gutter={16}>
          <Col span={18}>
            <div className="panel panel--white">
              <div className="panel__body">
                <Form onSubmit={this.props.handleSubmit}>
                  <Input.Group>
                    <Col span={12}>
                      <Form.Item>
                        {getFieldDecorator('name', {
                          rules: [{required: true, message: 'Это поле обязательно для заполнения'}, {min: 1, message: 'Укажите настоящее имя'}]
                        })(<Input placeholder="Иван" size="large"/>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        {getFieldDecorator('surname', {
                          rules: [{required: true, message: 'Это поле обязательно для заполнения'}]
                        })(<Input placeholder="Иванов" size="large"/>)}
                      </Form.Item>
                    </Col>
                  </Input.Group>
                  <Form.Item>
                    {getFieldDecorator('profession', {
                      rules: [{required: true, message: 'Это поле обязательно для заполнения'}]
                    })(<Input placeholder="React-разработчик" size="large"/>)}
                  </Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    loading={this.props.loading}
                    onClick={this.props.handleSubmit.bind(this)}
                  >Сохранить</Button>
                </Form>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="panel panel--white">
              <div className="panel__body">
                <DragDrop action='/'/>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    )
  }
}

export default Form.create()(PersonalInfo)
