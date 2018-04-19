import React from 'react'
import {Button, Form, Icon, Input, Layout, Spin, DatePicker} from 'antd'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

const {Content} = Layout

const LayoutStyles = {
  minHeight: '100vh',
}

const ContentStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

const FormStyles = {
  minWidth: '30%',
  maxWidth: '80%',
}

@inject('routing', 'user') @observer
class Signin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {user, routing, form} = this.props
    const formValues = form.getFieldsValue()
    user.registration({
      login: formValues.login,
      password: formValues.password,
      firstname: formValues.firstname,
      secondname: formValues.secondname,
      date_of_birth: formValues.date_of_birth.unix()
    })
      .then(res => {
        if (user.statusCode === 200) {
          routing.go('/login')
        }
      })
  }

  render() {
    const {routing, user, form} = this.props
    return (
      <Layout style={LayoutStyles}>
        <Content style={ContentStyles}>
          <h1>Signing up</h1>
          <Form
            hideRequiredMark={false}
            onSubmit={(e) => this.handleSubmit(e)}
            style={FormStyles}
            layout='vertical'>
            <Form.Item>
              {form.getFieldDecorator('login', {
                rules: [
                  {
                    required: true, message: 'Please input your username',
                  },
                  {
                    min: 4, message: 'Minimum username length is 4'
                  },
                  {
                    max: 18, message: 'Maximum username length is 18'
                  }
                ],
              })(
                <Input
                  label="Username"
                  disabled={user.isFetching}
                  // onChange={e => this.props.handleLoginChange(e)}
                  addonBefore={<Icon type="user"/>}
                  placeholder="admin123"/>
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [
                  {
                    required: true, message: 'Please input your password!',
                  },
                ],
              })(
                <Input
                  label="Password"
                  disabled={user.isFetching}
                  // onChange={e => this.props.handlePasswordChange(e)}
                  addonBefore={<Icon type="lock"/>}
                  type="password" placeholder="qwerty"/>,
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('firstname', {
                rules: [
                  {
                    required: true, message: 'First name is required.',
                  },
                ],
              })(
                <Input
                  disabled={user.isFetching}
                  // onChange={e => this.props.handlePasswordChange(e)}
                  type="text" placeholder="Ivan" label="First name"/>,
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('secondname', {
                rules: [
                  {
                    required: true, message: 'Second name is required.',
                  },
                ],
              })(
                <Input
                  disabled={user.isFetching}
                  // onChange={e => this.props.handlePasswordChange(e)}
                  type="text" placeholder="Ivanov" label="Second name"/>,
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator("date_of_birth", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message:
                      "Укажите вашу дату рождения. Для многих работодателей возраст сотрудника очень важен."
                  }
                ]
              })(<DatePicker showToday={false} placeholder="1996-01-12" disabled={user.isFetching} style={{width: '100%'}}/>)}
            </Form.Item>
            <Form.Item>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={user.isFetching}>
                  Sign up
                </Button>
                <span>If you have an account, <Link to='/login'>log in now!</Link></span>
              </div>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

const WrappedLoginForm = Form.create()(Signin)

export default WrappedLoginForm
