import { FORBIDDEN_STATUS_CODE } from './consts';

export default class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS_CODE;
  }
}
