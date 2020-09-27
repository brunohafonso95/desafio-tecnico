import { Request, Response } from 'express';

import { IController, IHttpRequest, IHttpResponse } from '@src/interfaces';

export default (
  controller: IController,
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params,
      headers: req.headers,
      body: req.body,
    };

    const httpResponse: IHttpResponse = await controller.handleRoute(
      httpRequest,
    );
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
