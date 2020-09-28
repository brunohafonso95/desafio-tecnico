import './utils/moduleAlias';
import 'dotenv/config';

import App from '@src/App';
import { getEnvVariables } from '@src/config/env';
import ExitedStatus from '@src/interfaces/enums/ExitedStatus';
import Logger from '@src/utils/Logger';

import { IApplicationConfig } from './interfaces';
import Schemas from './interfaces/enums/Schemas';

process.on('unhandledRejection', (reason, promise) => {
  Logger.error({
    msg: `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  });

  throw reason;
});

process.on('uncaughtException', error => {
  Logger.error({ msg: `App exiting due to an unhandled exception: ${error}` });

  process.exit(ExitedStatus.FAILURE);
});

(async () => {
  try {
    const { PORT } = getEnvVariables<IApplicationConfig>(
      Schemas.ApplicationConfigSchema,
    );
    const app = new App(PORT);
    await app.initApplication();
    app.startServer();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.forEach((signal: string) => {
      process.on(
        signal,
        async (): Promise<void> => {
          try {
            await app.closeApplication();
            Logger.info({ msg: 'App exited with success' });
            process.exit(ExitedStatus.SUCCESS);
          } catch (error) {
            Logger.info({ msg: 'App exited with error' });
            process.exit(ExitedStatus.FAILURE);
          }
        },
      );
    });
  } catch (error) {
    Logger.error({ msg: `App exited with error: ${error}` });
    process.exit(ExitedStatus.FAILURE);
  }
})();
