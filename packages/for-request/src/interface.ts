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
  beforeHook?: BeforeHook;
  afterHook?: AfterHook;
  dataHook?: DataHook;
  errorHook?: ErrorHook;
}

export type RequestMethod = <T>(url: string, options?: RequestOptions) => Promise<T>;

export interface Request extends RequestMethod {
  config: RequestConfig;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}

export type BeforeHook = (url: string, options: RequestOptions) => void;
export type AfterHook = (url: string, options: RequestOptions) => void;
export type DataHook = (result: any, url: string, options: RequestOptions) => any;
export type ErrorHook = (error: any, url: string, options: RequestOptions) => any;

export type RequestConfig = Pick<Config, 'setOptions' | 'before' | 'after' | 'data' | 'error'>;
