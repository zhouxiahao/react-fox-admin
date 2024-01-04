import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '@/types/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import axios from 'axios'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { isString, isUnDef, isNull, isEmpty } from '@/utils/is'
import { deepMerge } from '@/utils'
import { clone } from 'lodash-es'


type Recordable = any
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse } = options

    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res

    if (!data) {
      // t('sys.api.apiRequestFailed')
      throw new Error('Api request failed')
    }

    const { code, result, msg } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess) {
      let successMsg = msg

      if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
        successMsg = `sys.api.operationSuccess`;
      }

      // TODO: 自定义hook，请求成功调用antd的响应弹窗。
      // End....

      return result
    }

    throw new Error('Failed')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const params = config.params || {}
    const data = config.data || false

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {

      }
    } else {
      if (!isString(params)) {
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
      } else {
        // TODO: 兼容restful风格
      }
    }
    
    return config
  },

  requestInterceptors: (config, options) => {
    const { token = '' } = {}
    if (token && (config as any)?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        baseURL: process.env.REACT_APP_BASE_API,
        requestOptions: {
          // 需要对返回数据进行处理
          isTransformResponse: true,
          withToken: true
        }
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios()