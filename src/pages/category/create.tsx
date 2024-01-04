import React, { FC } from "react"
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from "antd"

const CreatCatogory: FC = () => {
  const onFinish = async (values: CommonObjectType<string>) => {
    console.log(values)
  }
  const FormView = (
    <Form
      onFinish={onFinish}
      style={{ width: 500 }}
    >
      <Form.Item
        label="分类名称："
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="分类排序："
        name="sort_order"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
  return (
    <div>
      {FormView}
    </div>
  )
}

export default CreatCatogory