import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  console.log('GET запрос /users', req, res);
};

export const getUser = (req: Request, res: Response) => {
  console.log('GET запрос /users/:id', req, res);
};

export const createUser = (req: Request, res: Response) => {
  console.log('POST запрос /users', req, res);
};

export const updateUser = (req: Request, res: Response) => {
  console.log('PATCH запрос /users/me', req, res);
};

export const updateUserAvatar = (req: Request, res: Response) => {
  console.log('PATCH запрос /users/me/avatar', req, res);
};
