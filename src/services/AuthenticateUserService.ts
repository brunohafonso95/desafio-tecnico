import httpStatus from 'http-status-codes';

import IAutheticateUserService from '@src/interfaces/IAuthenticateUserService';
import IAuthProvider from '@src/interfaces/IAuthProvider';
import IEncryptProvider from '@src/interfaces/IEncryptProvider';
import IUser from '@src/interfaces/IUser';
import IUserRepository from '@src/interfaces/IUserRepository';
import AuthProvider from '@src/providers/AuthProvider';
import EncryptProvider from '@src/providers/EncryptProvider';
import UserRepository from '@src/repositories/UserRepository';
import ApiError from '@src/utils/errors/ApiError';
import Logger from '@src/utils/Logger';

export default class AuthenticateUserService
  implements IAutheticateUserService {
  constructor(
    private readonly userRepository: IUserRepository = new UserRepository(),
    private readonly authProvider: IAuthProvider = new AuthProvider(),
    private readonly encryptProvider: IEncryptProvider = new EncryptProvider(),
  ) {}

  public async execute({
    email,
    senha,
  }: {
    email: string;
    senha: string;
  }): Promise<IUser & { id?: string }> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      Logger.error({ msg: `User not found with email: ${email}` });
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Usuário e/ou senha inválidos',
      );
    }

    const passwordsMatch = await this.encryptProvider.compareHash(
      senha,
      user.senha,
    );

    if (!passwordsMatch) {
      Logger.error({
        msg: `Authentication error of user with email: ${email}`,
      });
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Usuário e/ou senha inválidos',
      );
    }

    const token = this.authProvider.generateUserToken(user);
    const dataAtual = new Date().toISOString();
    await this.userRepository.updateUserByEmail(email, {
      token,
      data_atualizacao: dataAtual,
      ultimo_login: dataAtual,
    });

    return {
      ...user,
      token,
      data_atualizacao: dataAtual,
      ultimo_login: dataAtual,
    };
  }
}
