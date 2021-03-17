import ErrorCode from './ErrorCode';
import RequestError from './RequestError';

/**
 * NoPermission Error
 */
class NoPermission extends RequestError {
  name = 'NoPermission';

  constructor(message?: string) {
    super(ErrorCode.NoPermission, message || 'no permission');
  }
}

export default NoPermission;
