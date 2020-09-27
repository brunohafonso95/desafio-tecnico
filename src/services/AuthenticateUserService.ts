import httpStatus from 'http-status-codes';

import {
  IAutheticateUserService,
  IAuthProvider,
  IEncryptProvider,
  IUser,
  IUserRepository,
} from '@src/interfaces';
import ApiError from '@src/utils/errors/ApiError';
import Logger from '@src/utils/Logger';

export default class AuthenticateUserService
  implements IAutheticateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authProvider: IAuthProvider,
    private readonly encryptProvider: IEncryptProvider,
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
