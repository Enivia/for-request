import ErrorCode from './ErrorCode';
import RequestError from './RequestError';

/**
 * ResultException Error
 */
class ResultException extends RequestError {
  name = 'ResultException';

  constructor(message?: string) {
    super(ErrorCode.ResultException, message || 'result exception');
  }
}

export default ResultException;
