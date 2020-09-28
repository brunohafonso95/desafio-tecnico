import { Request, Response } from 'express';
import rateLimiter, { RateLimit } from 'express-rate-limit';
import httpStatus from 'http-status-codes';

export default function ({
  windowMs = 1 * 60 * 1000,
  max = 10,
}: rateLimiter.Options): RateLimit {
  return rateLimiter({
    windowMs,
    max,
    keyGenerator(req: Request): string {
      return req.ip;
    },
    handler(_req: Request, res: Response) {
      res.status(httpStatus.TOO_MANY_REQUESTS).json({
        messagem: 'you reach the limit of requests for this resource',
      });
    },
  });
}
