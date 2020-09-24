import IUser from './IUser';

export default interface IAuthProvider<T = any> {
  generateUserToken(userData: IUser & { id?: string }): string;
  generateToken(payload: {
    [key: string]: string | boolean | number | any;
  }): string;
  decodeToken(token: string): T;
}
