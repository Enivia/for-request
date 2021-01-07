import RequestConfig from './config';

export type ResponseType = 'json' | 'blob' | 'text';

export interface RequestOptions extends RequestInit {
  params?: any;
  responseType?: ResponseType;
  getResponse?: boolean;
  serializeParams?: boolean;
  prefix?: string;
}

export type RequestMethod = (
  url: string,
  params?: any,
  options?: RequestOptions
) => Promise<any>;

export interface Request extends RequestMethod {
  config: Pick<RequestConfig, 'before' | 'after' | 'data' | 'error'>;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}
