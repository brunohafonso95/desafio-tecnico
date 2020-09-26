import { Model } from 'mongoose';

import IUser from '@src/interfaces/IUser';
import IUserRepository from '@src/interfaces/IUserRepository';
import UserModel, { IUserModel } from '@src/models/UserModel';

class UserRepository implements IUserRepository {
  constructor(
    private readonly UserRepositoryModel: Model<IUserModel> = UserModel,
  ) {}

  public async create(userData: IUser): Promise<IUser & { id?: string }> {
    const newUser = new this.UserRepositoryModel(userData);
    await newUser.save();
    return newUser.toJSON();
  }

  public async getUserByEmail(
    email: string,
  ): Promise<(IUser & { id?: string }) | null> {
    const user = await this.UserRepositoryModel.findOne({
      email,
    });

    return user ? user.toJSON() : user;
  }

  public async getUserByIdAndToken(
    userId: string,
    token: string,
  ): Promise<IUser & { id?: string }> {
    const user = await this.UserRepositoryModel.findOne({ _id: userId, token });
    return user ? user.toJSON() : user;
  }

  public async updateUserByEmail(
    email: string,
    payload: Partial<IUser>,
  ): Promise<IUser & { id?: string }> {
    const user = await this.UserRepositoryModel.updateOne(
      { email },
      { $set: { ...payload } },
    );

    return user;
  }
}

export default UserRepository;
