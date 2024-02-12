import emailRegexp from '../helpers/email-regexp';

const { Joi } = require('celebrate');

export const createCardValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(new RegExp(emailRegexp)),
    createdAt: Joi.string(),
  }),
};

export const updateCardValidator = {
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }).unknown(true),
};
