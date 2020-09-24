import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import BaseController from '@src/abstracts/BaseController';

export default class NotFoundController extends BaseController {
  public handleNotFoundRoutes(_req: Request, res: Response): void {
    this.sendErrorResponse(res, httpStatus.NOT_FOUND, 'Not Found');
  }
}
