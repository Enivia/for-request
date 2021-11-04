import Config from './config';
import fetch from './fetch';
import { RequestOptions, Request } from './interface';

class RequestClass {
  config = new Config();

  get request() {
    const exportRequest = ((url: string, options?: RequestOptions) =>
      this.$fetch(url, { method: 'get', ...options })) as Request;
    exportRequest.config = this.config;
    exportRequest.get = this.get.bind(this);
    exportRequest.post = this.post.bind(this);
    exportRequest.put = this.put.bind(this);
    exportRequest.delete = this.delete.bind(this);
    return exportRequest;
  }

  private $fetch(url: string, requestOptions: RequestOptions) {
    const options: RequestOptions = { ...this.config.options, ...requestOptions };
    const { beforeHook, afterHook, dataHook, errorHook, ...optionsInit } = options;
    const $beforeHook = beforeHook || this.config.$beforeHook;
    const $afterHook = afterHook || this.config.$afterHook;
    const $dataHook = dataHook || this.config.$dataHook;
    const $errorHook = errorHook || this.config.$errorHook;

    $beforeHook(url, options);
    return fetch(url, optionsInit).then(
      res => {
        $afterHook(url, options);
        return $dataHook(res, url, options);
      },
      err => {
        $afterHook(url, options);
        return $errorHook(err, url, options);
      }
    );
  }

  get(url: string, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'get' });
  }
  post(url: string, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'post' });
  }
  put(url: string, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'put' });
  }
  delete(url: string, options?: RequestOptions) {
    return this.$fetch(url, { ...options, method: 'delete' });
  }
}

export default RequestClass;
