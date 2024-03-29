/**
 *
 * @description: Request result set
 * @export
 * @enum {number}
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = 'success',
}

export enum RequestEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * @description:  contentType
 */
 export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
