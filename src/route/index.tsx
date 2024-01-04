import { MenuRoute } from '@/route/types'
import React from 'react';
import { Navigate } from "react-router-dom";
import type { MenuProps } from 'antd';
import Home from '@/pages/home'

import {
  UserOutlined,
  BankOutlined
} from '@ant-design/icons'
// 封装路由懒加载
const LazyLoad = (path: string) => {
  const Comp = React.lazy(() => import(`@/pages/${path}`))
  return (
    <React.Suspense fallback={<>加载中...</>}>
      <Comp />
    </React.Suspense>
  )
}

const preDefinedRoutes =[
  {
    path: '/login',
    name: '登录页',
    key: 'login',
    breadcrumb: '登录页',
    element: (LazyLoad('login'))
  },
  {
    path: '/',
    element: (LazyLoad('container')),
    children: [
      {
        path: '', 
        exact: true,
        breadcrumb: 'Home',
        element: <Navigate to="home"></Navigate>
      },
      {
        path: 'home',
        name: '首页',
        breadcrumb: '首页',
        key: 'home',
        icon: <BankOutlined />,
        element: (LazyLoad('home'))
      },
      {
        path: 'user',
        name: '用户',
        breadcrumb: '用户',
        key: 'user',
        icon: <UserOutlined />,
        children: [
          {
            path: 'list',
            name: '列表',
            key: 'userList',
            breadcrumb: '用户列表',
            icon: <BankOutlined />,
            element: <>用户列表</>
          },
          {
            path: 'edit',
            name: '编辑',
            key: 'userEdit',
            breadcrumb: '用户编辑',
            icon: <BankOutlined />,
            element: <>用户编辑</>
          }
        ]
      },
      {
        path: 'catecory',
        name: '分类',
        breadcrumb: '分类',
        key: 'catecory',
        icon: <UserOutlined />,
        children: [
          {
            path: 'create',
            name: '创建分类',
            key: 'create-category',
            breadcrumb: '创建分类',
            icon: <BankOutlined />,
            element: (LazyLoad('category/create'))
          }
        ]
      }
    ]
  }
]

export default preDefinedRoutes