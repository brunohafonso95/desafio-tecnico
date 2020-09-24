import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';

import CustomMongoValidation from '@src/interfaces/enums/CustomMongoValidation';
import Logger from '@src/utils/Logger';

export interface HTTPError extends Error {
  status?: number;
}

function handleClientErrors(
  error: mongoose.Error.ValidationError,
): { code: number; error: string } {
  const duplicatedKindErrors = Object.values(error.errors).filter(
    err => err.kind === CustomMongoValidation.DUPLICATED,
  );

  if (duplicatedKindErrors.length) {
    return {
      code: httpStatus.CONFLICT,
      error: 'E-mail já existente',
    };
  }

  return {
    code: httpStatus.BAD_REQUEST,
    error: error.message,
  };
}

// eslint-disable-next-line max-params
export default function (
  error: mongoose.Error.ValidationError | HTTPError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { code, error: err } = handleClientErrors(error);

      res.status(code).json({ mensagem: err });
      return;
    }

    Logger.error({ msg: 'Internal Error', error });
    const errorCode = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    res
      .status(errorCode)
      .json({ messagem: error.message || 'Something went wrong' });
  }

  next();
}
