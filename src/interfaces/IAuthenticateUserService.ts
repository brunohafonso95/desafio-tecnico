import IUser from './IUser';

export default interface IAutheticateUserService {
  execute(payload: {
    email: string;
    senha: string;
  }): Promise<IUser & { id?: string }>;
}
