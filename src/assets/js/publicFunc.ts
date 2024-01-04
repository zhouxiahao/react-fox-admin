import routes from '@/route/index'
import { Routes } from 'react-router-dom';

export const flattenRoutes = (arr: CommonObjectType<unknown>[]) =>
  arr.reduce(
    (prev: CommonObjectType<unknown>[], item:
    CommonObjectType<unknown>) => {
      if (Array.isArray(item.children)) {
        prev.push(item)
      }
      return prev.concat(
        Array.isArray(item.children) ? flattenRoutes(item.children)
          : item
      )
    },
    []
  )
export const getKeyName = (path: string) => {
  const truePath = path.split('?')[0]
  const curRoute = flattenRoutes(routes).filter((route : {
    path: string | string[]
  }) => truePath.includes(<string>(route.path)))
  const { name, key, element } = curRoute[curRoute.length-1]
  return  { title: name, tabKey: key, element }
}
