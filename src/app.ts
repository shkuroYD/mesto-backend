import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '65c1244f51b207332fb02757',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
