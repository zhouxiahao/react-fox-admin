import Axios, { AxiosResponse } from "axios"
import { message } from "antd"
import { ResponseData } from '@/api/resInterface'


interface AxiosConfig {
  timeout: number,
  headers: {
    'Content-Type': string
  },
  baseURL: string
}

const config: AxiosConfig = {
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
}

const axios = Axios.create(config)

// 请求前拦截
axios.interceptors.request.use(
  (req) => {
    const { token = '' } = {}
    req.headers.token = token
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 返回后拦截
axios.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    const { data } = res
    if (data.results?.length) {
      // return Promise.resolve({
      //   result: data.results,
      //   code: data.code,
      //   message: data.message
      // })
      Promise.resolve(data)
    }
    if (data) {
      return Promise.resolve(data)
    }
    return Promise.reject('error')
  },
  (err) => {
    try {
      if (JSON.stringify(err).includes('403')) {
        // ...
      }
    } catch (error) {

    }
    message.destroy()
    message.error('请求失败')
    return Promise.reject(err)
  }
)

// post请求
// @ts-ignore
axios.post = (url: string, params?: object): Promise<any> => 
  axios({
    method: 'post',
    url,
    data: params
  })
  

// get请求
axios.get = (url: string): Promise<any> => 
  axios({
    method: 'get',
    url
  })

export default axios

