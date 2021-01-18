import RequestConfig from './config';
import fetch from './fetch';
import { RequestOptions } from './interface';

class RequestClass {
  config = new RequestConfig();

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

  request(url: string, params?: any, options?: RequestOptions) {
    return this.$fetch(url, { ...options, params });
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
