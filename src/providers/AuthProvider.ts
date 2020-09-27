import jwt from 'jsonwebtoken';

import { authConfig } from '@src/config/env';
import { IAuthProvider, IUser } from '@src/interfaces';

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

  public generateUserToken(userData: IUser & { id?: string }): string {
    return this.generateToken({
      nome: userData.nome,
      email: userData.email,
      ultimo_login: new Date().toISOString(),
    });
  }
}
