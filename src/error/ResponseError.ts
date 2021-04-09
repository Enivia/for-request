import ErrorCode from './ErrorCode';

class ResponseError extends Error {
  name = 'ResponseError';
  response: Response;
  code: ErrorCode = ErrorCode.NotSpecified;

  constructor(response: Response, code: ErrorCode = ErrorCode.NotSpecified, message?: string) {
    super(message);
    this.code = code;
    this.response = response;
  }

  toString() {
    return this.message;
  }
}

export default ResponseError;
