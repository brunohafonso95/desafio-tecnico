import expressPinoLogger from 'express-pino-logger';
import P from 'pino';

import Logger from '@src/utils/Logger';

export default (): any =>
  expressPinoLogger({
    logger: Logger.getLoggerInstance() as P.Logger,
  });
