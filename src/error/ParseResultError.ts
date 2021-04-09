import ErrorCode from './ErrorCode';
import ResponseError from './ResponseError';

/**
 * Parse Result Error
 */
class ParseResultError extends ResponseError {
  name = 'ParseResultError';

  constructor(response: Response, message?: string) {
    super(response, ErrorCode.ParseResultError, message || 'parse result error');
  }
}

export default ParseResultError;
