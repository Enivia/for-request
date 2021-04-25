import Config from './config';

export type ResponseType = 'json' | 'blob' | 'text';
export type QueryParam = object | URLSearchParams;
export type DataParam = any;

export interface RequestOptionsInit extends RequestInit {
  query?: QueryParam;
  data?: DataParam;
  responseType?: ResponseType;
  getResponse?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface RequestOptions extends RequestOptionsInit {
  beforeHook?: TBeforeHook;
  afterHook?: TAfterHook;
  dataHook?: TDataHook;
  errorHook?: TErrorHook;
}

export type RequestMethod = <T>(url: string, options?: RequestOptions) => Promise<T>;

export interface Request extends RequestMethod {
  config: RequestConfig;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}

export type TBeforeHook = (url: string, options: RequestOptions) => void;
export type TAfterHook = (url: string, options: RequestOptions) => void;
export type TDataHook = (result: any, url: string, options: RequestOptions) => any;
export type TErrorHook = (error: any, url: string, options: RequestOptions) => any;

export type RequestConfig = Pick<Config, 'setOptions' | 'before' | 'after' | 'data' | 'error'>;
