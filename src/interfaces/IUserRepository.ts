import IUser from '@src/interfaces/IUser';

export default interface IUserRepository {
  create(userData: IUser): Promise<IUser & { id?: string }>;
  getUserByEmail(email: string): Promise<(IUser & { id?: string }) | null>;
  getUserByIdAndToken(
    userId: string,
    token: string,
  ): Promise<(IUser & { id?: string }) | null>;
  updateUserByEmail(
    email: string,
    payload: Partial<IUser>,
  ): Promise<IUser & { id?: string }>;
}
