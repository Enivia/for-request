import ErrorCode from './ErrorCode';

class RequestError extends Error {
  name = 'RequestError';

  code: ErrorCode;

  constructor(code: ErrorCode = ErrorCode.Unknown, message?: string) {
    super(message);
    this.code = code;
  }

  toString() {
    return this.message;
  }
}

export default RequestError;
