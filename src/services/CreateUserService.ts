import IUser from '@src/interfaces/IUser';
import IService from '@src/interfaces/IService';
import IRepository from '@src/interfaces/IRepository';
import UserRepository from '@src/repositories/UserRepository';
import IAuthProvider from '@src/interfaces/IAuthProvider';
import AuthProvider from '@src/providers/AuthProvider';

interface ICreateUser extends IUser  {
  id: string;
}
export default class CreateUserService implements IService {
  constructor(
    private readonly userRepository: IRepository = new UserRepository(),
    private readonly authProvider: IAuthProvider = new AuthProvider(),
  ) {}

  public async execute(userData: IUser): Promise<ICreateUser> {
    const newUser = (await this.userRepository.create(userData)) as ICreateUser;
    return {
      ...newUser,
      token: this.generateUserToken(newUser),
    };
  }

  private generateUserToken(userData: IUser & { id?: string }): string {
    return this.authProvider.generateToken({
      id: userData.id,
      nome: userData.nome,
      email: userData.email,
      ultimo_login: userData.ultimo_login,
    });
  }
}
