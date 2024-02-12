import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { NotFoundError, ConflictError, BadRequestError } from '../errors';
import { SessionRequest } from '../middlewares/auth';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({}, {
  password: false,
})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id, {
    password: false,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      return res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { user: sessionUser, body } = req as SessionRequest;

  return User.findByIdAndUpdate(
    sessionUser._id,
    { name: body.name, about: body.about, avatar: body.avatar },
    {
      new: true,
      runValidators: true,
      lean: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }

      const { password, ...data } = user;

      return res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { user: sessionUser, body } = req as SessionRequest;

  return User.findByIdAndUpdate(sessionUser._id, { avatar: body.avatar }, {
    new: true,
    runValidators: true,
    lean: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }

      const { password, ...data } = user;

      return res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};
