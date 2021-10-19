import ErrorCode from './ErrorCode';
import ResponseError from './ResponseError';

/** Http Error */
class HttpError extends ResponseError {
  name = 'HttpError';

  constructor(response: Response, message?: string) {
    super(response, ErrorCode.HttpError, message || 'http error');
  }
}

export default HttpError;
