export type RequestMethod = (
  url: string,
  params?: any,
  options?: RequestInit
) => Promise<any>;

export interface Request {
  (url: string, params?: any, options?: RequestInit): Promise<any>;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}
 