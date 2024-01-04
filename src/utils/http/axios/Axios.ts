import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import type { CreateAxiosOptions } from './axiosTransform';
import qs from 'qs'
import { isFunction } from '@/utils/is';
import type { RequestOptions, Result } from '@/types/axios'
import { cloneDeep } from 'lodash-es'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'

export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: any

  constructor(options: any) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   *
   * @description: Set general header
   * @param {*} headers
   * @memberof VAxios
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) return

    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   *
   * @description: Interceptor configuration 拦截器配置
   * @private
   * @memberof VAxios
   */
  private setupInterceptors() {
    const {
      axiosInstance,
      options: { transform },
    } = this

    if (!transform) return

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const { requestOptions } = this.options

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }

      return config
    })

    // Request interceptor error capture
    requestInterceptorsCatch &&
    isFunction(requestInterceptorsCatch) &&
    this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res
    })

    // 响应错误捕捉拦截器
    responseInterceptorsCatch &&
    this.axiosInstance.interceptors.response.use(undefined, (error) => {
      return responseInterceptorsCatch(axiosInstance, error)
    })
  }

  // 支持 form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.data
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets'})
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({...config, method: 'GET'}, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // TODO: POST 类型
    debugger
    return this.request({ ...config, method: 'POST' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {}
    
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt)
              resolve(ret)
            } catch (error) {
              reject(error || new Error('request error !'))
            }
          }
          resolve(res as unknown as Promise<T>)
          // unknown 类型代表任何值。 这类似于 any 类型，但更安全，因为使用 unknown 值做任何事情都是不合法的：
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        })
    })
  }

}
// https://github.dev/vbenjs/vue-vben-admin/blob/main/src/utils/http/axios/Axios.ts