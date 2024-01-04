import React, { FC, useState } from 'react'
import MenuView from '@/components/common/menu'
import TopHeader from '@/components/common/header'
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content, Footer } = Layout;
import styles from './container.module.less'

const Home: FC = (props: any) => {

  const [collapsed, setCollapsed] = useState(false);
  const collapsedBack = (cop: boolean) => {
    setCollapsed(cop)
  }

  return (
    <Layout className='w-full h-full'>
      <MenuView collapsed={collapsed} />
      <Layout className={styles.content}>
        <TopHeader collapsed={collapsed} style={{ padding: 0 }} collapsedBack={collapsedBack} />
        <Content className="layout-content p-4">
          <div className="bg-white rounded-sm" style={{ padding: 12, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer className='flex justify-center'>Fox blog admin</Footer>
      </Layout>
    </Layout>
  )
}

export default Home