import httpStatus from 'http-status-codes';

export default class ValidateSchemaError extends Error {
  constructor(
    public message: string,
    public status: number = httpStatus.BAD_REQUEST,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
