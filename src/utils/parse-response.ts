import { RequestOptions } from '../interface';

export default function parseResponse(response: Response, options: RequestOptions) {
  const { responseType, getResponse } = options;

  // @ts-ignore
  const data = response[responseType]();

  if (getResponse) {
    return { data, response };
  }
  return data;
}
