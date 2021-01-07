import { RequestOptions } from '../interface';
import parseResponse from '../utils/parse-response';
import serialize from '../utils/serialize';

function getRequestMethod(method?: string) {
  return !method ? 'GET' : method.toUpperCase();
}

function getRequestOptions(options: RequestOptions): RequestOptions {
  const method = getRequestMethod(options.method);
  const requestOptions: RequestOptions = {
    ...options,
    method,
    responseType: options.responseType || 'json',
    prefix: options.prefix || '',
  };
  return requestOptions;
}

function fetchMethod(url: string, options: RequestOptions) {
  const requestOptions = getRequestOptions(options);
  console.log('fetch method called:', url, requestOptions);
  const {
    responseType,
    getResponse,
    params,
    serializeParams,
    prefix,
    ...requestInit
  } = requestOptions;

  let requestUrl = `${prefix}${url}`;
  if (requestInit.method === 'GET' || serializeParams) {
    const serializedParams = serialize(params);
    const joiner = url.indexOf('?') >= 0 ? '&' : '?';
    requestUrl = `${url}${joiner}${serializedParams}`;
  } else {
    requestInit.body = params;
  }

  return new Promise((resolve, reject) => {
    fetch(requestUrl, requestInit)
      .then(res => parseResponse(res, options))
      .then(resolve)
      .catch(reject);
  });
}

export default fetchMethod;
