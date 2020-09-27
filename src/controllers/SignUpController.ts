import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import {
  IHttpRequest,
  IHttpResponse,
  IController,
  ICreateUserService,
} from '@src/interfaces';

export default class SignupController
  extends BaseController
  implements IController {
  constructor(private readonly createUserService: ICreateUserService) {
    super();
  }

  public async handleRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const newUser = await this.createUserService.execute(httpRequest.body);
    return this.formatGenericSuccessResponse(newUser, httpStatus.CREATED);
  }
}
