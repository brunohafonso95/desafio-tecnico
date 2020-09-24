import express, { Application } from 'express';

import { notFoundController } from '@src/controllers';

export default class App {
  private server: Application;

  constructor(private port: number = 3333) {
    this.server = express();
    this.setupGlobalMiddlewares();
    this.setupRoutes();
    this.setupNotFoundMiddleware();
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
    this.server.listen(this.port, () => {
      console.info('server listening');
    });
  }
}
