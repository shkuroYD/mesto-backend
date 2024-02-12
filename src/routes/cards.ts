import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { createCardValidator, updateCardValidator } from '../validators/card';

const { celebrate } = require('celebrate');

const router = Router();

router.get('/', getCards);
router.post('/', celebrate(createCardValidator), createCard);

router.delete('/:cardId', celebrate(updateCardValidator), deleteCard);

router.put('/:cardId/likes', celebrate(updateCardValidator), likeCard);
router.delete('/:cardId/likes', celebrate(updateCardValidator), dislikeCard);

export default router;
