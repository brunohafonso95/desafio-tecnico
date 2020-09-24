import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import IService from '@src/interfaces/IService';
import CreateUserService from '@src/services/CreateUserService';

export default class SignupController extends BaseController {
  constructor(
    private readonly createUserService: IService = new CreateUserService(),
  ) {
    super();
  }

  public async handleSignupRoute(req: Request, res: Response): Promise<void> {
    const newUser = await this.createUserService.execute(req.body);
    this.sendSuccessResponse(res, httpStatus.CREATED, newUser);
  }
}
