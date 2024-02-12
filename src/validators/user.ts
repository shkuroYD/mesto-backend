import emailRegexp from '../helpers/email-regexp';

const { Joi } = require('celebrate');

export const createUserValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(new RegExp(emailRegexp)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

export const getUserValidator = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }).unknown(true),
};

export const updateUserValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(new RegExp(emailRegexp)),
  }),
};

export const updateUserAvatarValidator = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(emailRegexp)),
  }),
};
