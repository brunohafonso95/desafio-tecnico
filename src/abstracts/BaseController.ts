import httpStatus from 'http-status-codes';

import { IHttpResponse } from '@src/interfaces';

export default abstract class BaseController {
  protected formatGenericSuccessResponse(
    payload: any,
    statusCode: number = httpStatus.OK,
  ): IHttpResponse {
    return {
      statusCode,
      body: payload,
    };
  }

  protected formatGenericErrorResponse(
    message: string,
    statusCode: number = httpStatus.BAD_REQUEST,
  ): IHttpResponse {
    return {
      statusCode,
      body: { mensagem: message },
    };
  }
}
