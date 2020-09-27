import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import {
  IHttpResponse,
  IController,
  IAutheticateUserService,
} from '@src/interfaces';

export default class SigninController
  extends BaseController
  implements IController {
  constructor(
    private readonly authenticateUserService: IAutheticateUserService,
  ) {
    super();
  }

  public async handleRoute(httpRequest: IHttpResponse): Promise<IHttpResponse> {
    const autheticatedUser = await this.authenticateUserService.execute(
      httpRequest.body,
    );

    return this.formatGenericSuccessResponse(
      autheticatedUser,
      httpStatus.CREATED,
    );
  }
}
