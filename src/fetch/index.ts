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
    const serialized = serialize(params);
    if (serialized) {
      const joiner = url.indexOf('?') >= 0 ? '&' : '?';
      requestUrl = `${requestUrl}${joiner}${serialized}`;
    }
  } else {
    requestInit.body = params;
  }
  // console.log('fetch method called:', requestUrl, requestOptions);

  return new Promise((resolve, reject) => {
    fetch(requestUrl, requestInit)
      .then(res => parseResponse(res, requestOptions))
      .then(resolve)
      .catch(reject);
  });
}

export default fetchMethod;
