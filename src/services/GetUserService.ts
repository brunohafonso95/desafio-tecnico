import httpStatus from 'http-status-codes';

import { IGetUserService, IUserRepository, IUser } from '@src/interfaces';
import checkIfTheDateHasBeenPassedInMinutes from '@src/utils/checkIfTheDateHasBeenPassedInMinutes';
import ApiError from '@src/utils/errors/ApiError';
import Logger from '@src/utils/Logger';

export default class GetUserService implements IGetUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    userId: string,
    token: string,
  ): Promise<IUser & { id?: string }> {
    const user = await this.userRepository.getUserByIdAndToken(userId, token);
    if (!user) {
      Logger.error({
        msg: 'Usuário não encontrado com o id e token informados',
        userId,
        token,
      });
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Não Autorizado');
    }

    if (checkIfTheDateHasBeenPassedInMinutes(user.ultimo_login as string)) {
      Logger.error({ msg: 'Sessão inválida pois o token já está expirado' });
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Sessão inválida');
    }

    return user;
  }
}
