import React, { useEffect, FC } from "react"
import { Form, Input, Button, message } from "antd"
import { useNavigate } from 'react-router-dom'
import { login } from '@/api/login'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // 判断是否有token
    const token = ''

    if (token) {
      navigate('/')
      return
    } 
  })
  const onFinish =async (values: CommonObjectType<string>) => {
    console.log('login action...')
    const { username, password } = values
    interface User {
      email: string,
      age: number
    }
    try {
      const result = await login({
        email: username,
        password
      })
      if (result.token) {
        navigate('/')
      }
      // dispatchEvent(setUserInfo(result))
    } catch (err) {
      const response = (err as any)?.response
      message.error(
        response
          ? `发生错误:${response.data}`
          : `认证服务异常,请联系管理员:${err}`
      )
    }
  }
  const FormView = (
    <Form
      initialValues={{username: 'admin@163.com', password: 'Admin12345.'}}
      className="login-form sm:w-1/2 2xl:w-1/4 h-1/2 flex flex-col justify-center content-center"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          placeholder="密码"
          size="large"
        />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Button
          className="login-form-button"
          htmlType="submit"
          size="large"
          type="primary"  
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className="login-layout w-full h-full flex flex-col justify-center items-center">
      <div className="logo-blog-admin w-32 h-32 bg-red-50 rounded-full flex justify-center items-center font-bold text-blue-500 text-lg">
        BLOG ADMIN
      </div>
      {FormView}
    </div>
  )
}



export default LoginForm