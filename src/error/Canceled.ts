import ErrorCode from './ErrorCode';
import RequestError from './RequestError';

/**
 * Canceled Error
 */
class Canceled extends RequestError {
  name = 'Canceled';

  constructor(message?: string) {
    super(ErrorCode.Canceled, message || 'canceled');
  }
}

export default Canceled;
