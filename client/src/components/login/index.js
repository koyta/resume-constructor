import React from 'react'
import { Button, Form, Icon, Input, Layout } from 'antd'

const {Sider, Content} = Layout
const FormItem = Form.Item

const LayoutStyles = {
  minHeight: '100vh'
}

const ContentStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const FormStyles = {
  minWidth: '30%',
  maxWidth: '80%'
}

const Login = (routing, user, ...props) => {
  return (
    <Layout style={LayoutStyles}>
      <Content style={ContentStyles}>
        <Form onSubmit={props.handleSubmit} style={FormStyles} layout='vertical'>
          <FormItem>
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"/>
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password" placeholder="Password"/>
          </FormItem>{/**/}
          <FormItem>
            <Button type="primary" htmlType="submit"
                    className="login-form-button">
              Log in
            </Button>
            <span> Or <a href="">register now!</a></span>
          </FormItem>
        </Form>
      </Content>
    </Layout>
  )
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm