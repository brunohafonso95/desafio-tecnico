import './utils/moduleAlias';
import 'dotenv/config';

import { applicationConfig } from '@src/config/env';
import ExitedStatus from '@src/interfaces/enums/ExitedStatus';
import Logger from '@src/utils/Logger';

import App from './app';

(async () => {
  try {
    const { port } = applicationConfig.getEnv();
    const app = new App(port);
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