import IUser from './IUser';

export default interface IGetUserService {
  execute(userId: string, token: string): Promise<IUser & { id?: string }>;
}
