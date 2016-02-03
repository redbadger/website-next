const errorMap = {
  401: 'Not Authorised',
  404: 'Not Found',
  500: 'Network Error',
  'default': 'Error'
};

export default class HttpError extends Error {
  constructor (status) {
    const message = errorMap[status] || errorMap.default;
    super(message);
    this.name = 'HttpError';
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.name);
  }
}
