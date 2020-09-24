import pino, { BaseLogger } from 'pino';

import { loggerOptions } from '@src/config';
import ILogData from '@src/interfaces/IlogData';

type ILogger = BaseLogger;

class Logger {
  constructor(private logger: ILogger = pino(loggerOptions)) {}

  public info(logData: ILogData): void {
    this.logger.info({ ...logData });
  }

  public warn(logData: ILogData): void {
    this.logger.warn({ ...logData });
  }

  public error(logData: ILogData): void {
    this.logger.error({ ...logData });
  }

  public debug(logData: ILogData): void {
    this.logger.debug({ ...logData });
  }

  public getLoggerInstance(): BaseLogger {
    return this.logger;
  }
}

export default new Logger();
