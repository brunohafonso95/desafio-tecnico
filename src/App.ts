import express, { Application } from 'express';
import 'express-async-errors';
import openapi from 'openapi-comment-parser';
import swaggerUI from 'swagger-ui-express';

import { NotFoundController } from '@src/controllers';
import * as mongo from '@src/database/mongo';
import { signupRoutes, signinRoutes, getUserRoutes } from '@src/routes';

import expressRouteAdapter from './adapters/expressRouteAdapter';
import validateEnvVariables from './config/env/validateEnvVariables';
import { errorMiddleware, bodyParserMiddleware } from './middlewares';
import openapiConfig from './openapirc';
import Logger from './utils/Logger';

const apiSchema = openapi(openapiConfig);

export default class App {
  private server: Application;

  constructor(private port: number = 3333) {
    this.server = express();
  }

  private setupGlobalMiddlewares(): void {
    Logger.info({ msg: 'Setuping global middlewares' });
    this.server.use(bodyParserMiddleware());
    Logger.info({ msg: 'Global middlewares setup was successfully finished' });
  }

  private docsSetup(): void {
    Logger.info({ msg: 'Setuping the application docs' });
    this.server.use('/docs', swaggerUI.serve, swaggerUI.setup(apiSchema));
    Logger.info({ msg: 'Application docs setup was successfully finished' });
  }

  private setupRoutes(): void {
    Logger.info({ msg: 'Setuping the application routes' });
    this.server.use('/api/v1', signupRoutes);
    this.server.use('/api/v1', signinRoutes);
    this.server.use('/api/v1', getUserRoutes);
    Logger.info({ msg: 'Application routes setup was successfully finished' });
  }

  private setupGlobalErrorMiddleware(): void {
    Logger.info({ msg: 'Setuping global error middleware' });
    this.server.use(errorMiddleware);
    Logger.info({
      msg: 'Global Error middleware setup was successfully finished',
    });
  }

  private setupNotFoundMiddleware(): void {
    Logger.info({ msg: 'Setuping not found error middleware' });
    const notFoundController = new NotFoundController();
    this.server.use(expressRouteAdapter(notFoundController));
    Logger.info({
      msg: 'Not found error middleware setup was successfully finished',
    });
  }

  private validateEnvVariables(): void {
    Logger.info({ msg: 'Validating env variables' });
    validateEnvVariables();
    Logger.info({ msg: 'The env variables was validated with success' });
  }

  public async initApplication(): Promise<void> {
    Logger.info({ msg: 'Initalizing the application' });
    this.validateEnvVariables();
    this.docsSetup();
    this.setupGlobalMiddlewares();
    this.setupRoutes();
    this.setupNotFoundMiddleware();
    this.setupGlobalErrorMiddleware();
    await this.databaseSetup();
    Logger.info({
      msg: 'The inital setup of application was finished successfully',
    });
  }

  private async databaseSetup(): Promise<void> {
    Logger.info({ msg: 'Connecting to database' });
    await mongo.connect();
    Logger.info({ msg: 'Database connected successfully' });
  }

  public async closeApplication(): Promise<void> {
    Logger.info({ msg: 'Closing the application' });
    await mongo.close();
    Logger.info({ msg: 'Database disconnected successfully' });
  }

  public startServer(): void {
    Logger.info({ msg: `Starting the server on port ${this.port}` });
    this.server.listen(this.port, () => {
      Logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }
}
