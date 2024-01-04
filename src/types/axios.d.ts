export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
export type SuccessMesssageMode = ErrorMessageMode

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  msg: string;
  result: T;
}