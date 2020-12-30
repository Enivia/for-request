import fetchMethod from './fetch';
import { Request } from './interface';

class RequestClass {
  private fetch(url: string, params: any, options: RequestInit) {
    return fetchMethod(url, params, options);
  }

  get(url: string, params?: any, options?: RequestInit) {
    return this.fetch(url, params, { ...options, method: 'get' });
  }
  post(url: string, params?: any, options?: RequestInit) {
    return this.fetch(url, params, { ...options, method: 'post' });
  }
  put(url: string, params?: any, options?: RequestInit) {
    return this.fetch(url, params, { ...options, method: 'put' });
  }
  delete(url: string, params?: any, options?: RequestInit) {
    return this.fetch(url, params, { ...options, method: 'delete' });
  }
}

const requestClass = new RequestClass();

const request: Request = requestClass.get as Request;
request.get = requestClass.get;
request.post = requestClass.get;
request.put = requestClass.get;
request.delete = requestClass.get;

export default request;
