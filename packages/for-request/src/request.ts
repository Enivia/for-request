import RequestConfig from './config';
import fetch from './fetch';
import { RequestOptions, Request, RequestOptionsInit } from './interface';

class RequestClass {
  config = new RequestConfig();

  get request() {
    const exportRequest = ((url: string, options?: RequestOptions) => {
      return this.$fetch(url, { ...options });
    }) as Request;

    exportRequest.config = this.config;
    exportRequest.get = this.get.bind(this);
    exportRequest.post = this.post.bind(this);
    exportRequest.put = this.put.bind(this);
    exportRequest.delete = this.delete.bind(this);
    return exportRequest;
  }

  private $getOptions(
    options: RequestOptions
  ): RequestOptionsInit &
    Pick<RequestConfig, '$beforeHook' | '$afterHook' | '$dataHook' | '$errorHook'> {
    const { dataHook, errorHook, beforeHook, afterHook, ...optionsInit } = {
      ...this.config.options,
      ...options,
    };
    const $beforeHook = beforeHook || this.config.$beforeHook;
    const $afterHook = afterHook || this.config.$afterHook;
    const $dataHook = dataHook || this.config.$dataHook;
    const $errorHook = errorHook || this.config.$errorHook;
    return { $beforeHook, $afterHook, $dataHook, $errorHook, ...optionsInit };
  }

  private $fetch(url: string, options: RequestOptions) {
    const { $beforeHook, $afterHook, $dataHook, $errorHook, ...optionsInit } = this.$getOptions(
      options
    );

    $beforeHook(url, optionsInit);
    return fetch(url, optionsInit).then(
      res => {
        $afterHook(url, optionsInit);
        return $dataHook(res, url, optionsInit);
      },
      err => {
        $afterHook(url, optionsInit);
        return $errorHook(err, url, optionsInit);
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
