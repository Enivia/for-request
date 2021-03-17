import ErrorCode from './ErrorCode';
import RequestError from './RequestError';

/**
 * ServiceException Error
 */
class ServiceException extends RequestError {
  name = 'ServiceException';

  constructor(message?: string) {
    super(ErrorCode.ServiceException, message || 'service exception');
  }
}

export default ServiceException;
