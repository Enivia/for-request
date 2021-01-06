import { RequestOptions } from '../interface';
import parseResponse from '../utils/parse-response';

function getRequestMethod(method?: string) {
  return !method ? 'GET' : method.toUpperCase();
}

function getRequestOptions(options: RequestOptions): RequestOptions {
  const requestOptions: RequestOptions = {
    method: getRequestMethod(options.method),
    responseType: options.responseType || 'json',
    getResponse: options.getResponse || false,
    // TODO: serialize
    body: options.params,
  };
  return requestOptions;
}

function fetchMethod(url: string, options: RequestOptions) {
  const requestOptions = getRequestOptions(options);
  console.log('fetch method called:', url, requestOptions);
  const { responseType, getResponse, ...requestInit } = requestOptions;

  return new Promise((resolve, reject) => {
    fetch(url, requestInit)
      .then(res => parseResponse(res, options))
      .then(resolve)
      .catch(reject);
  });
}

export default fetchMethod;
