import ErrorCode from './ErrorCode';

class ResponseError extends Error {
  name = 'ResponseError';
  response: Response;
  code?: ErrorCode;

  constructor(response: Response, code?: ErrorCode, message?: string) {
    super(message);
    this.code = code;
    this.response = response;
  }

  toString() {
    return this.message;
  }
}

export default ResponseError;
