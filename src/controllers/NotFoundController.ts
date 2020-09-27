import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';
import { IHttpRequest, IHttpResponse, IController } from '@src/interfaces';

export default class NotFoundController
  extends BaseController
  implements IController {
  public handleRoute(_httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return Promise.resolve(
      this.formatGenericErrorResponse('Not Found', httpStatus.NOT_FOUND),
    );
  }
}
