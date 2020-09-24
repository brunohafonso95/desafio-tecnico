import express, { Application } from 'express';

import { notFoundController } from '@src/controllers';

import Logger from './utils/Logger';
import loggerConfig from './config/logger';

export default class App {
  private server: Application;

  constructor(private port: number = 3333) {
    this.server = express();
  }

  private setupGlobalMiddlewares(): void {
    this.server.use(express.json());
  }

  private setupRoutes(): void {
    console.log('routes');
  }

  private setupNotFoundMiddleware(): void {
    this.server.use(
      notFoundController.handleNotFoundRoutes.bind(notFoundController),
    );
  }

  public initApplication(): void {
    this.setupGlobalMiddlewares();
    this.setupRoutes();
    this.setupNotFoundMiddleware();
  }

  public closeApplication(): void {
    Logger.info({ msg: 'Closing the application' });
  }

  public startServer(): void {
    this.server.listen(this.port, () => {
      Logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }
}
