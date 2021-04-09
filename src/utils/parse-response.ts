import { RequestOptions, ResponseType } from '../interface';

export default function parseResponse(response: Response, options: RequestOptions) {
  const { responseType, getResponse } = options;

  const data = response[responseType as ResponseType]();

  if (getResponse) {
    return { data, response };
  }
  return data;
}
