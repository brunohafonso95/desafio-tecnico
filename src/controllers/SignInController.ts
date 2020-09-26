import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import IAutheticateUserService from '@src/interfaces/IAuthenticateUserService';
import AuthenticateUserService from '@src/services/AuthenticateUserService';

export default class SigninController extends BaseController {
  constructor(
    private readonly authenticateUserService: IAutheticateUserService = new AuthenticateUserService(),
  ) {
    super();
  }

  public async handleSigninRoute(req: Request, res: Response): Promise<void> {
    const autheticatedUser = await this.authenticateUserService.execute(
      req.body,
    );
    this.sendSuccessResponse(res, httpStatus.CREATED, autheticatedUser);
  }
}
