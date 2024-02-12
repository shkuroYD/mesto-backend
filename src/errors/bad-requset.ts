import { BAD_REQUEST_STATUS_CODE } from './consts';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS_CODE;
  }
}
