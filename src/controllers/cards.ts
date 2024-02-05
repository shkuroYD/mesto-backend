import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({}).then((cards) => res.send({ data: cards })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const createCard = (req: Request, res: Response) => {
  const { name, link, createdAt } = req.body;

  return Card.create({
    // @ts-ignore
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCard = (req: Request, res: Response) => Card.findByIdAndDelete(req.params.cardId)
  .then((card) => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  // @ts-ignore
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  // @ts-ignore
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
