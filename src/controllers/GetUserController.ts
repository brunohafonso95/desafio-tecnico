import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import {
  IHttpRequest,
  IHttpResponse,
  IGetUserService,
  IController,
} from '@src/interfaces';
import Logger from '@src/utils/Logger';

export default class GetUserController
  extends BaseController
  implements IController {
  constructor(private readonly getUserService: IGetUserService) {
    super();
  }

  public async handleRoute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { user_id } = httpRequest.params;
    const token = httpRequest.headers['x-access-token'];
    if (!user_id || !token) {
      Logger.error({ msg: 'id do usuário ou token não fornecidos' });
      return this.formatGenericErrorResponse(
        'Sessão inválida',
        httpStatus.UNAUTHORIZED,
      );
    }

    const [, tokenBody] = token.split(' ');

    const user = await this.getUserService.execute(user_id, tokenBody);
    return this.formatGenericSuccessResponse(user);
  }
}
