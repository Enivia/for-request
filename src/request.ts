import RequestConfig from './config';
import fetchMethod from './fetch';
import { Request } from './interface';

class RequestClass {
  config = new RequestConfig();

  private fetch(url: string, params: any, options: RequestInit) {
    const { $beforeHook, $afterHook, $dataHook, $errorHook } = this.config;

    $beforeHook();
    return fetchMethod(url, params, options).then(
      res => {
        console.log(res)
        $afterHook();
        return $dataHook();
      },
      err => {
        console.log(err)
        $afterHook();
        return $errorHook();
      }
    );
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

const entity = new RequestClass();

const request: Request = entity.get as Request;
request.config = entity.config;
request.get = entity.get;
request.post = entity.post;
request.put = entity.put;
request.delete = entity.delete;

export default request;
