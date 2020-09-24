import IUser from '@src/interfaces/IUser';

export default interface IUserRepository {
  create(userData: IUser): Promise<IUser & { id?: string }>;
  getBySpecificField(
    fieldName: keyof IUser,
    fieldValue: string,
  ): Promise<(IUser & { id?: string }) | null>;
  updateBySpecificField(
    fieldName: keyof IUser,
    fieldValue: string,
    payload: Partial<IUser>,
  ): Promise<IUser & { id?: string }>;
}
