import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import emailRegexp from '../helpers/email-regexp';

interface IUser {
  name?: string,
  about?: string,
  avatar?: string,
  email: string,
  password: string
}

interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line
  findUserByCredentials: (email: Pick<IUser, 'email'>, password: Pick<IUser, 'password'>) => (
    Promise<mongoose.Document<unknown, any, IUser>>
  )
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v: string) {
        return emailRegexp.test(v);
      },
      message: (props) => `${props.value} - не валидная ссылка`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
