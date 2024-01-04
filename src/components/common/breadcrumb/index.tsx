import React, { FC } from 'react'
import { Breadcrumb, Button } from 'antd'
import { Link } from 'react-router-dom'
import useBreadcrumbs from "use-react-router-breadcrumbs"
import routes from '@/route/index'
import './index.less'


const Breadcrumbs: FC = () => {
  const breadcrumbs = useBreadcrumbs(routes, {
    excludePaths: ['/home']
  })
  console.log(breadcrumbs)
  const items = breadcrumbs.map(({match, breadcrumb, key }) => {
    return {
      title: <Link to={match.pathname}>{breadcrumb}</Link>,
      key
    }
  })
  return (
    <Breadcrumb
      className='breadcrumb-custom px-4 inline-block !text-white'
      items={items}
    />
  )
}
export default Breadcrumbs