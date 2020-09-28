import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

import AuthProvider from '@src/providers/AuthProvider';
import Logger from '@src/utils/Logger';

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization as string;

  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json({ mensagem: 'Não Autorizado' });
    return;
  }

  const [authType, tokenBody] = token.split(' ');

  if (!authType || !tokenBody) {
    res.status(httpStatus.UNAUTHORIZED).json({ mensagem: 'token malformado' });
    return;
  }

  if (!/Bearer/gm.test(authType)) {
    res.status(httpStatus.UNAUTHORIZED).json({ mensagem: 'token malformado' });
    return;
  }

  try {
    const authProvider = new AuthProvider();
    const decoded = authProvider.decodeToken(tokenBody);
    req.decoded = decoded;
    next();
  } catch (error) {
    Logger.error({
      msg: 'Falha na validação da autenticação',
      errorMessage: error.message,
    });
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ mensagem: 'Erro inesperado na autenticação' });
  }
}
