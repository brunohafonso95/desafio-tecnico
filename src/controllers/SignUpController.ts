import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import ICreateUserService from '@src/interfaces/ICreateUserService';
import CreateUserService from '@src/services/CreateUserService';

export default class SignupController extends BaseController {
  constructor(
    private readonly createUserService: ICreateUserService = new CreateUserService(),
  ) {
    super();
  }

  public async handleSignupRoute(req: Request, res: Response): Promise<void> {
    const newUser = await this.createUserService.execute(req.body);
    this.sendSuccessResponse(res, httpStatus.CREATED, newUser);
  }
}
