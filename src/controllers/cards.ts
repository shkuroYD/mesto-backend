import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { NotFoundError, BadRequestError, ForbiddenError } from '../errors';
import { SessionRequest } from '../middlewares/auth';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}).then((cards) => res.send({ data: cards })).catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { user, body } = req as SessionRequest;

  return Card.create({
    name: body.name, link: body.link, owner: user._id, createdAt: body.createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as SessionRequest;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      if (card.owner?.toString() !== user._id) {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }

      return Card.deleteOne({ _id: req.params.cardId });
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as SessionRequest;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }

      return res.send({ data: card });
    })
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as SessionRequest;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }

      return res.send({ data: card });
    })
    .catch(next);
};
