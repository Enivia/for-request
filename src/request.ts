import RequestConfig from './config';
import fetchMethod from './fetch';
import { Request, RequestOptions } from './interface';

class RequestClass {
  config = new RequestConfig();

  private fetch(url: string, options: RequestOptions) {
    const { $beforeHook, $afterHook, $dataHook, $errorHook } = this.config;

    $beforeHook(url, options);
    return fetchMethod(url, options).then(
      res => {
        $afterHook(url, options);
        return $dataHook(url, options, res);
      },
      err => {
        $afterHook(url, options);
        return $errorHook(url, options, err);
      }
    );
  }

  get(url: string, params?: any, options?: RequestOptions) {
    return this.fetch(url, { ...options, method: 'get', params });
  }
  post(url: string, params?: any, options?: RequestOptions) {
    return this.fetch(url, { ...options, method: 'post', params });
  }
  put(url: string, params?: any, options?: RequestOptions) {
    return this.fetch(url, { ...options, method: 'put', params });
  }
  delete(url: string, params?: any, options?: RequestOptions) {
    return this.fetch(url, { ...options, method: 'delete', params });
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
