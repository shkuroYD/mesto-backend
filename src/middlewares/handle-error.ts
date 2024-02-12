import { Request, Response, NextFunction } from 'express';

interface ICustomError extends Error {
  statusCode?: number
}

// eslint-disable-next-line no-unused-vars, max-len
export default function handleError(err: ICustomError, req: Request, res: Response, next: NextFunction) {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка по умолчанию'
        : `${message}`,
    });
}
