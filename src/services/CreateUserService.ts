import IAuthProvider from '@src/interfaces/IAuthProvider';
import IService from '@src/interfaces/IService';
import IUser from '@src/interfaces/IUser';
import IUserRepository from '@src/interfaces/IUserRepository';
import AuthProvider from '@src/providers/AuthProvider';
import UserRepository from '@src/repositories/UserRepository';

interface ICreateUser extends IUser {
  id: string;
}
export default class CreateUserService implements IService {
  constructor(
    private readonly userRepository: IUserRepository = new UserRepository(),
    private readonly authProvider: IAuthProvider = new AuthProvider(),
  ) {}

  public async execute(userData: IUser): Promise<ICreateUser> {
    const token = this.authProvider.generateUserToken(userData);
    const newUser = (await this.userRepository.create({
      ...userData,
      token,
    })) as ICreateUser;

    return newUser;
  }
}
