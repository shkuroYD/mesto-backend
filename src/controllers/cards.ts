import { Request, Response } from 'express';

export const getCards = (req: Request, res: Response) => {
  console.log('GET запрос /cards', req, res);
};

export const createCard = (req: Request, res: Response) => {
  console.log('POST запрос /cards', req, res);
};

export const deleteCard = (req: Request, res: Response) => {
  console.log('DELETE запрос /cards/:cardId', req, res);
};

export const likeCard = (req: Request, res: Response) => {
  console.log('PUT запрос /cards/:cardId/likes', req, res);
};

export const dislikeCard = (req: Request, res: Response) => {
  console.log('DELETE запрос /cards/:cardId/likes', req, res);
};
