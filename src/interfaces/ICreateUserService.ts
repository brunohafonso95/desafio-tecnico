import IUser from './IUser';

export default interface ICreateUserService {
  execute(userData: IUser): Promise<IUser & { id?: string }>;
}
