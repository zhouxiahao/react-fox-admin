import React, { useState, useEffect, FC } from 'react'
import { Layout, Dropdown, Space } from 'antd'
import Breadcrumb from '@/components/common/breadcrumb'
import type { MenuProps } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

const TopHeader:FC<any> = ((props) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
  };
  const items: MenuProps['items'] = [{
    key: 'logout',
    label: '退出登录'
  }] 
  return (
    <Layout.Header className='text-white px-4'>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => props.collapsedBack(!props.collapsed),
        }
      )}
      <Breadcrumb />
      {/* 右上角 */}
      <Dropdown className='fr' menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            ZHOU xiahao
          </Space>
        </a>
      </Dropdown>
    </Layout.Header>
  )
})

export default TopHeader