import React from 'react'
import { Button, Form, Icon, Input, Layout } from 'antd'
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
  flexDirection: 'column'
}

const FormStyles = {
  minWidth: '30%',
  maxWidth: '80%',
}

const Login_ = ({routing, user, form}, ...props) => {
  return (
    <Layout style={LayoutStyles}>
      <Content style={ContentStyles}>
        <h1>Sign in</h1>
        <Form hideRequiredMark={false} onSubmit={(e) => props.handleSubmit(e)}
              style={FormStyles} layout='vertical'>
          <Form.Item>
            {form.getFieldDecorator('username', {
              rules: [
                {
                  required: true, message: 'Please input your username',
                },
              ],
            })(
              <Input
                onChange={e => props.handleLoginChange(e)}
                addonBefore={<Icon type="user"/>}
                placeholder="Username"/>,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [
                {
                  required: true, message: 'Please input your password',
                },
              ],
            })(
              <Input
                onChange={e => props.handlePasswordChange(e)}
                addonBefore={<Icon type="lock"/>}
                type="password" placeholder="Password"/>,
            )}
          </Form.Item>
          <Form.Item>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign in
              </Button>
              <span>If you don't have an account, <Link to='/signup'>sign up now!</Link></span>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}

const Login = (props) => {
  return (
    <Layout style={LayoutStyles}>
      <Content style={ContentStyles}>
        <h1>Sign in</h1>
        <Form onSubmit={(e) => props.handleSubmit(e)} style={FormStyles}>
          <Form.Item>
            <Input
              onChange={e => props.handleLoginChange(e)}
              addonBefore={<Icon type="user"/>}
              disabled={props.loading}
              placeholder="Username"/>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={e => props.handlePasswordChange(e)}
              addonBefore={<Icon type="lock"/>}
              disabled={props.user.isFetching}
              type="password" placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Button loading={props.user.isFetching} type="primary" htmlType="submit"
                      className="login-form-button">Sign in</Button>
              <span>If you don't have an account, <Link
                to='/signup'>sign up now!</Link></span>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}

// const WrappedLoginForm = Form.create()(Login)

export default Login