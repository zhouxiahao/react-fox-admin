const path = require('path')
const CracoLessPlugin = require('craco-less')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
const { loaderByName } = require('@craco/craco')

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('src'),
      // src: pathResolve('src'),
      // assets: pathResolve('src/assets'),
      // common: pathResolve('src/common'),
      // components: pathResolve('src/components'),
      // hooks: pathResolve('src/hooks'),
      // pages: pathResolve('src/pages'),
      // store: pathResolve('src/store'),
      // utils: pathResolve('src/utils'),
      // route: pathResolve('src/route'),
        // 此处是一个示例，实际可根据各自需求配置
    },
   
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, {
      env, paths
    }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist' // 配合输出打包修改文件目录
        // webpackConfig中可以解构出你想要的参数比如mode、devtool、entry等等，更多信息请查看webpackConfig.json文件
        /**
         * 修改 output
         */
      webpackConfig.output = {
          ...webpackConfig.output,
            // ...{
            //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
            //   chunkFilename: 'static/js/[name].js'
            // },
            path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
            publicPath: '/'
        }
        /**
         * webpack split chunks
         */
        // webpackConfig.optimization.splitChunks = {
        //   ...webpackConfig.optimization.splitChunks,
        //   ...{
        //     chunks: 'all',
        //     name: true
        //   }
        // }
        // 返回重写后的新配置
      return webpackConfig
    }
  },
  babel: {
    presets: [],
    plugins: [
      // AntDesign 按需加载
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }, 'antd'],

    ],
    loaderOptions: {},
    loaderOptions: (babelLoaderOptions, {
      env, paths
    }) => {
      return babelLoaderOptions
    }
  },
  /**
   * 新增 craco 提供的 plugin
   */
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
          // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                  "@primary-color": "#6e41ff"
                },
                javascriptEnabled: true
            }
        },
        modifyLessModuleRule(lessModuleRule, context) {
          lessModuleRule.test = /.module.less$/
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          }
          return lessModuleRule
        }
      }
    }
  ],
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://192.168.100.79:6688',
        changeOrigin: true,
        secure: false,
        xfwd: false,
      }
    }
  }
}