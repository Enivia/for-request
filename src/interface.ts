import Config from './config';

export type ResponseType = 'json' | 'blob' | 'text';

export interface RequestOptions extends RequestInit {
  params?: any;
  responseType?: ResponseType;
  getResponse?: boolean;
  serializeParams?: boolean;
  prefix?: string;
}

export type RequestMethod = <T>(
  url: string,
  params?: any,
  options?: RequestOptions
) => Promise<T>;

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

export type RequestConfig = Pick<
  Config,
  'setOptions' | 'before' | 'after' | 'data' | 'error'
>;
