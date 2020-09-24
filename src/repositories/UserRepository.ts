import { Model } from 'mongoose';

import IRepository from '@src/interfaces/IRepository';
import IUser from '@src/interfaces/IUser';
import UserModel, { IUserModel } from '@src/models/UserModel';

class UserRepository implements IRepository<IUser, IUser> {
  constructor(
    private readonly UserRepositoryModel: Model<IUserModel> = UserModel,
  ) {}

  public async create(userData: IUser): Promise<IUser> {
    const newUser = new this.UserRepositoryModel(userData);
    await newUser;
    return newUser.toJSON();
  }
}

export default UserRepository;
