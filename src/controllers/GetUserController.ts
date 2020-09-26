import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import IGetUserService from '@src/interfaces/IGetUserService';
import GetUserService from '@src/services/GetUserService';
import Logger from '@src/utils/Logger';

export default class GetUserController extends BaseController {
  constructor(
    private readonly getUserService: IGetUserService = new GetUserService(),
  ) {
    super();
  }

  public async handleGetUserByIdRoute(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { user_id } = req.params;
    const token = (req.headers['x-access-token'] || '') as string;
    if (!user_id || !token) {
      Logger.error({ msg: 'id do usuário ou token não fornecidos' });
      this.sendErrorResponse(res, httpStatus.UNAUTHORIZED, 'Sessão inválida');
      return;
    }

    const [, tokenBody] = token.split(' ');

    const user = await this.getUserService.execute(user_id, tokenBody);
    this.sendSuccessResponse(res, httpStatus.OK, user);
  }
}
