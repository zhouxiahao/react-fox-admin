import Ax from '@/utils/axios'
import { defHttp } from '@/utils/http/axios';
import { ResponseData } from '../resInterface'
import { User } from '../model/login'
import { UserInfo } from '@/app_models/user';
enum Api {
  Login = '/v1/admin/login',
}

// export function login<T>(params?: object): Promise<any> {
// export function login<T>(params?: object) {
//   // return Ax.post<ResponseData<T>>(
//   return Ax.post(
//     '/v1/admin/login',
//     params
//   )
// }

export function createCategory<T>(params?: object): Promise<any> {
  return Ax.post<ResponseData<T>>(
    '/v1/category/create',
    params
  )
}

export const login = (params: User) => 
  defHttp.post<UserInfo>({ url: Api.Login, params })
  // , headers: { 'content-type': 'multipart/form-data;charset=UTF-8' }

// https://juejin.cn/post/6969070102868131853