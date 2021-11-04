import { Fetch, Interceptor, RequestOptionsInit } from '../interface';
import parseResponse from '../utils/parse-response';
import serialize, { stringifyParams } from '../utils/serialize';
import HttpError from '../error/HttpError';

function getRequestMethod(method?: string) {
  return !method ? 'GET' : method.toUpperCase();
}
function getRequestOptions(options: RequestOptionsInit): RequestOptionsInit {
  const method = getRequestMethod(options.method);
  const requestOptions: RequestOptionsInit = {
    ...options,
    method,
    responseType: options.responseType || 'json',
    prefix: options.prefix || '',
    suffix: options.suffix || '',
  };
  return requestOptions;
}
class FetchClass {
  private interceptors: Interceptor[] = [];

  interceptor(handler: Interceptor) {
    this.interceptors.push(handler);
  }

  get fetch() {
    const exportFetch = ((url: string, options: RequestOptionsInit) =>
      this.$trigger(url, options)) as Fetch;
    exportFetch.interceptor = this.interceptor.bind(this);
    return exportFetch;
  }

  private $trigger(url: string, options: RequestOptionsInit) {
    const requestOptions = getRequestOptions(options);
    const {
      responseType,
      getResponse,
      prefix,
      suffix,
      query,
      data,
      ...requestInit
    } = requestOptions;

    let requestUrl = `${prefix}${url}${suffix}`;
    if (requestInit.method === 'GET' || query) {
      const serialized = serialize(query);
      if (serialized) {
        const joiner = url.indexOf('?') >= 0 ? '&' : '?';
        requestUrl = `${requestUrl}${joiner}${serialized}`;
      }
    }
    if (!requestInit.body && data) {
      requestInit.body = stringifyParams(data);
    }
    return new Promise(resolve => {
      fetch(requestUrl, requestInit)
        .then(response => {
          return this.interceptors.reduce(
            (promise, interceptor) => promise.then(res => interceptor(res, options)),
            Promise.resolve(response)
          );
        })
        .then(response => {
          if (response.ok) {
            parseResponse(response, requestOptions);
          } else {
            throw new HttpError(response);
          }
        })
        .then(resolve);
    });
  }
}

const fetchEntity = new FetchClass();
export default fetchEntity.fetch;
