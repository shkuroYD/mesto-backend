import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({}).then((cards) => res.send({ data: cards })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

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
