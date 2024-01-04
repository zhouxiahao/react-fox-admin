import React, { FC, useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import menus from '@/route/index'
import { flattenRoutes, getKeyName } from '@/assets/js/publicFunc'
import type { MenuProps, MenuTheme } from 'antd';
import { check } from 'prettier'
import Item from 'antd/es/list/Item'
type MenuItem = Required<MenuProps>['items'][number]
const flatMenu = flattenRoutes(menus)
type MenuType = CommonObjectType<string>


const MenuView: FC<any> = ((props) => {
  const [collapsed, setcollapsed] = useState(props.collapsed)
  const { pathname } = useLocation()
  // const { tabKey: curKey = 'home' } = getKeyName(pathname)
  const [current, setCurrent] = useState('home')

  // 菜单点击事件
  const handleClick = ({ key }): void => {
    console.log(key)
  }

  // 递归逐级
  const higherMenuKey = useCallback(
    (checkKey = 'home', path = pathname) => {
      if (flatMenu.some((item: MenuType) => item.key === checkKey)) return checkKey
      const higherPath = path.match(/(.*)\//g)[0].replace(/(.*)\//, '$1')
      const { tabKey } = getKeyName(higherPath)
      return higherMenuKey(tabKey, higherPath)
    },
    [pathname]
  )

  useEffect(() => {
    const { tabKey } = getKeyName(pathname)
    const higherKey = higherMenuKey(tabKey)
    setCurrent(tabKey)
  }, [higherMenuKey, pathname])

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const createMenuItems = (list: CommonObjectType, parentPath: string = ''): MenuItem[] => {
    const items: MenuItem[] = list.filter(item => item.path !== '')
      .map((item) => {
        const showChild = item.children

        if (item.children) { 
          item.children = createMenuItems(item.children, item.path)
        }

        const path = `${parentPath}/${item.path}`
        return Object.assign(getItem(
          <NavLink to={path}>{item.name}</NavLink>,
          item.key,
          item.icon,
          showChild && item.children
        ), item)
      })
    return items
  }

  const MenuItems: MenuItem[] = createMenuItems(menus[1].children)
  
  // 用于监听 props.collapsed 改变 收缩前先关闭所有展开项 打开前先展开当前选中项
  useEffect(() => {
    if (!props.collapsed) {
      setcollapsed(props.collapsed);
    } else {
      setcollapsed(props.collapsed);
    }
  }, [props.collapsed]);

  const setDefaultKey = flatMenu
    .filter(item => item.children && pathname.includes(item.key))
    .reduce((prev: MenuType[], next: MenuType) => {
      return [...prev, next.key]
    }, [])

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        userSelect: 'none'
      }}
      width={250}
    >
      <Menu
        mode="inline"
        onClick={handleClick}
        theme={'dark'}
        defaultOpenKeys={setDefaultKey}
        selectedKeys={[current]}
        items={MenuItems}
      >
      </Menu>
    </Layout.Sider>
  )
})

export default MenuView