# React + ts 项目搭建
## 搭建文章学习
1. https://juejin.cn/post/6955664681306423327
2. https://juejin.cn/post/6925421856883212296
3. https://cloud.tencent.com/developer/article/1842697
4. https://github.com/hsl947/react-antd-multi-tabs-admin.git
## 搭建步骤
1. 安装相关插件依赖
2. 配置tsconfig.json, 文件可以理解为存放编译TS的配置文件，这边我粘贴一下自己的配置
  ①：**如何把项目确定为TS项目的**
3. tailwindcss配置：https://juejin.cn/post/7043714956516130846
   1. 卡壳：CRA版本5.0.1配置alias时出现Module not fund问题
   - 开始采用的是通过customize-cra，自定义webpack配置的，但是无效。可能是版本不兼容
   - 换了craco，配置craco.config.js解决了问题
   - github上有相关的issue：https://github.com/facebook/create-react-app/issues/5118
   ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "*": [
            "*",
            "generated/*"
          ]
        }
      }
    }
   ```
   - 它告诉编译器所有匹配"*"（所有的值）模式的模块导入会在以下两个位置查找：
      1. "*"： 表示名字不发生改变，所以映射为<moduleName> => <baseUrl>/<moduleName>
      2. "generated/*"表示模块名添加了“generated”前缀，所以映射为<moduleName> => <baseUrl>/generated/<moduleName>
4. 配置antd按需引入，less-loader。同时配置了tailwindui
   - tailindcss与antd样式有冲突，这里采用禁止tailwindcss默认样式
   ```js
    // tailwind.config.js
    module.exports = {
      // ...
      corePlugins: {2
        preflight: false
      }
    }
   ```
5. 路由配置流程梳理
  - https://blog.csdn.net/King_land/article/details/125439431
  - https://blog.csdn.net/qq_41581588/article/details/126347606
  - https://reactrouter.com/en/main/start/overview
  - http://www.reactrouter.cn/docs/ v6 官网文档
  ```js
    // TODO: 一级路由容器，props是否是传入需要显示的路由模块？
    <Route
      path="/"
      key="container"
      render={(props: unknown) => <Container {...props} />}
    />
    // 通过路由配置来展示嵌套路由
    const routeConfig = [
      { path: '/',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
          { path: 'about', component: About },
          { path: 'inbox',
            component: Inbox,
            childRoutes: [
              { path: '/messages/:id', component: Message },
              { path: 'messages/:id',
                onEnter: function (nextState, replaceState) {
                  replaceState(null, '/messages/' + nextState.params.id)
                }
              }
            ]
          }
        ]
      }
    ]

    React.render(<Router routes={routeConfig} />, document.body)
  ```
6. 面包屑配置：https://www.npmjs.com/package/use-react-router-breadcrumbs
7. axios引入TS类型限制：https://github.dev/vbenjs/vue-vben-admin/blob/main/src/utils/http/axios/Axios.ts
## 问题合集
1. 保存less文件时，编译会自动生成一份css文件
  - 解决方案：打开首选项setting.json，配置如下：
```js
  "tss-less.compile": { 
    "out": null
  },
```
1. 