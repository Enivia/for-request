import RequestConfig from './config';

export type RequestMethod = (
  url: string,
  params?: any,
  options?: RequestInit
) => Promise<any>;

export interface Request extends RequestMethod {
  config: Pick<RequestConfig, 'before' | 'after' | 'data' | 'error'>;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}
