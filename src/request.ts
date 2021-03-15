import RequestConfig from './config';
import fetch from './fetch';
import { RequestOptions, Request } from './interface';

class RequestClass {
  config = new RequestConfig();

  get request() {
    const exportRequest = ((url: string, params?: any, options?: RequestOptions) => {
      return this.$fetch(url, { ...options, params });
    }) as Request;

    exportRequest.config = this.config;
    exportRequest.get = this.get.bind(this);
    exportRequest.post = this.post.bind(this);
    exportRequest.put = this.put.bind(this);
    exportRequest.delete = this.delete.bind(this);
    return exportRequest;
  }

  private $fetch(url: string, options: RequestOptions) {
    const { $beforeHook, $afterHook, $dataHook, $errorHook } = this.config;
    const requestOptions = { ...this.config.options, ...options };

    $beforeHook(url, requestOptions);
    return fetch(url, requestOptions).then(
      res => {
        $afterHook(url, requestOptions);
        return $dataHook(res, url, requestOptions);
      },
      err => {
        $afterHook(url, requestOptions);
        return $errorHook(err, url, requestOptions);
      }
    );
  }

  get(url: string, params?: any, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'get', params });
  }
  post(url: string, params?: any, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'post', params });
  }
  put(url: string, params?: any, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'put', params });
  }
  delete(url: string, params?: any, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'delete', params });
  }
}

export default RequestClass;
