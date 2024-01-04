import React from 'react'

import { useRoutes } from "react-router-dom";
import preDefinedRoutes from './index'

const LazyLoad = (path: string) => {
  const Comp = React.lazy(() => import(`@/pages/${path}`))
  return (
    <React.Suspense fallback={<>加载中...</>}>
      <Comp />
    </React.Suspense>
  )
}
const Router = () => { 
  const resRoutes = useRoutes(preDefinedRoutes) 
  return resRoutes
}
export default Router