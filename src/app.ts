import express, { Application } from 'express';
import 'express-async-errors';

import { NotFoundController } from '@src/controllers';
import * as mongo from '@src/database/mongo';
import { signupRoutes, signinRoutes, getUserRoutes } from '@src/routes';

import expressRouteAdapter from './adapters/expressRouteAdapter';
import validateEnvVariables from './config/env/validateEnvVariables';
import { errorMiddleware, bodyParserMiddleware } from './middlewares';
import Logger from './utils/Logger';

export default class App {
  private server: Application;

  constructor(private port: number = 3333) {
    this.server = express();
  }

  private setupGlobalMiddlewares(): void {
    Logger.info({ msg: 'Setuping global middlewares' });
    this.server.use(bodyParserMiddleware());
  }

  private setupRoutes(): void {
    Logger.info({ msg: 'Setuping the application routes' });
    this.server.use('/api/v1', signupRoutes);
    this.server.use('/api/v1', signinRoutes);
    this.server.use('/api/v1', getUserRoutes);
  }

  private setupGlobalErrorMiddleware(): void {
    Logger.info({ msg: 'Setuping global error middleware' });
    this.server.use(errorMiddleware);
  }

  private setupNotFoundMiddleware(): void {
    Logger.info({ msg: 'Setuping not found error middleware' });
    const notFoundController = new NotFoundController();
    this.server.use(expressRouteAdapter(notFoundController));
  }

  private validateEnvVariables(): void {
    Logger.info({ msg: 'Validating env variables' });
    validateEnvVariables();
  }

  public async initApplication(): Promise<void> {
    Logger.info({ msg: 'Initalizing the application' });
    this.validateEnvVariables();
    this.setupGlobalMiddlewares();
    this.setupRoutes();
    this.setupNotFoundMiddleware();
    this.setupGlobalErrorMiddleware();
    await this.databaseSetup();
  }

  private async databaseSetup(): Promise<void> {
    Logger.info({ msg: 'Connecting to database' });
    await mongo.connect();
  }

  public async closeApplication(): Promise<void> {
    Logger.info({ msg: 'Closing the application' });
    await mongo.close();
  }

  public startServer(): void {
    Logger.info({ msg: `Starting the server on port ${this.port}` });
    this.server.listen(this.port, () => {
      Logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }
}
