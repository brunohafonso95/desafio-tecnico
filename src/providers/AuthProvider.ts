import jwt from 'jsonwebtoken';

import { authConfig } from '@src/config/env';
import IUser from '@src/interfaces/IUser';
import IAuthProvider from '@src/interfaces/IAuthProvider';

export interface IDecodedUser extends Omit<IUser, '_id'> {
  id: string;
}

const { AUTH_SECRET, AUTH_EXPIRES_IN } = authConfig.getEnv();

export default class AuthProvider implements IAuthProvider<IDecodedUser> {
  public generateToken(payload: {
    [key: string]: string | boolean | number | any;
  }): string {
    const token = jwt.sign(payload, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES_IN,
    });

    return token;
  }

  public decodeToken(token: string): IDecodedUser {
    return jwt.verify(token, AUTH_SECRET) as IDecodedUser;
  }
}
