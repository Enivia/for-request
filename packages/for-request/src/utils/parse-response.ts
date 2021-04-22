import ParseResultError from '../error/ParseResultError';
import { RequestOptions, ResponseType } from '../interface';

export default function parseResponse(response: Response, options: RequestOptions) {
  const { responseType, getResponse } = options;

  let data;
  try {
    data = response[responseType as ResponseType]();
  } catch (e) {
    throw new ParseResultError(response);
  }

  if (getResponse) {
    return { data, response };
  }
  return data;
}
