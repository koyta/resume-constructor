import React from 'react'
import { Button, Form, Icon, Input, Layout } from 'antd'

const {Content} = Layout

const LayoutStyles = {
  minHeight: '100vh',
}

const ContentStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const FormStyles = {
  minWidth: '30%',
  maxWidth: '80%',
}

const Login = ({routing, user, ...props}) => {
  return (
    <Layout style={LayoutStyles}>
      <Content style={ContentStyles}>
        <Form hideRequiredMark={true} onSubmit={(e) => props.handleSubmit(e)}
              style={FormStyles} layout='vertical'>
          <Form.Item>
            <Input
              onChange={e => props.handleLoginChange(e)}
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"/>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={e => props.handlePasswordChange(e)}
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password" placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <Button onClick={props.loginClick} type="primary" htmlType="submit"
                    className="login-form-button">
              Log in
            </Button>
            <span> Or <a href="">register now!</a></span>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm