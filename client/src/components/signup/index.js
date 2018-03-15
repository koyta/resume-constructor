import React from 'react'
import { Button, Form, Icon, Input, Layout, Spin } from 'antd'
import { Link } from 'react-router-dom'

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

const Signin = ({routing, user, form, ...props}) => {
  return (
    <Layout style={LayoutStyles}>
      <Content style={ContentStyles}>
        <h1>Signing up</h1>
        <Form hideRequiredMark={false} onSubmit={(e) => props.handleSubmit(e)}
              style={FormStyles} layout='vertical'>
          <Form.Item>
            {form.getFieldDecorator('username', {
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
                disabled={user.isFetching}
                onChange={e => props.handleLoginChange(e)}
                addonBefore={<Icon type="user"/>}
                placeholder="Username"/>
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
                disabled={user.isFetching}
                onChange={e => props.handlePasswordChange(e)}
                addonBefore={<Icon type="lock"/>}
                type="password" placeholder="Password"/>,
            )}
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

const WrappedLoginForm = Form.create()(Signin)

export default WrappedLoginForm