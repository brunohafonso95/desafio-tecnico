import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import { IHttpRequest, IHttpResponse, IController } from '@src/interfaces';
import Logger from '@src/utils/Logger';

export default class NotFoundController
  extends BaseController
  implements IController {
  public async handleRoute(_httpRequest: IHttpRequest): Promise<IHttpResponse> {
    Logger.warn({ msg: 'rota não encontrada' });
    return Promise.resolve(
      this.formatGenericErrorResponse('Not Found', httpStatus.NOT_FOUND),
    );
  }
}
