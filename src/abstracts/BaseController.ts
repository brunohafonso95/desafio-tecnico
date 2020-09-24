import { Response } from 'express';

export default abstract class BaseController {
  protected sendSuccessResponse<T = any>(
    res: Response,
    statusCode: number,
    payload: T,
  ): void {
    res.status(statusCode).json(payload);
  }

  protected sendErrorResponse<T = any>(
    res: Response,
    statusCode: number,
    message: string,
  ): void {
    res.status(statusCode).json({ mensagem: message });
  }
}
