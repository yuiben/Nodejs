import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as http from 'http';
import { Server } from '@overnightjs/core';
import Log from './utils/Log';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import 'reflect-metadata';
import { dataSource } from '../ormconfig';
import { Container } from "typeorm-typedi-extensions";
import { useContainer } from "typeorm";

class ApiServer extends Server {
  private className = 'ApiServer';
  private appserver: http.Server;

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.all('/*', this.setupCORS);
  }

  private async initServer(): Promise<void> {
    useContainer(Container);
    dataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!")
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })

    this.setupControllers();

    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
  }

  private setupControllers(): void {
    // eslint-disable-next-line
    const ctlrInstances: any = [];

    for (const name in controllers) {
      if (Object.prototype.hasOwnProperty.call(controllers, name)) {
        // eslint-disable-next-line
        const controller = Container.get((controllers as any)[name]);
        ctlrInstances.push(controller);
      }
    }

    super.addControllers(ctlrInstances);
  }

  public async start(port: number): Promise<void> {
    const funcName = 'start';

    try {
      await this.initServer();

      this.appserver = this.app.listen(port, () => {
        Log.info(this.className, funcName, `Server started on port: ${port}`);
      });

      this.appserver.setTimeout(parseInt(<string>process.env.SERVER_TIMEOUT, 10));
    } catch (ex) {
      Log.info(this.className, funcName, ex);
    }
  }

  public stop(): void {
    if (this.appserver) this.appserver.close();
  }

  private setupCORS(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.header(
      'Access-Control-Allow-Headers',
      `Origin, X-Requested-With, Content-type, Accept, X-Access-Token, X-Key, Authorization, X-Forwarded-For`
    );

    const allowOrigins: string[] = (<string>process.env.ALLOW_ORIGIN).split(',');
    let origin: string = '';
    const headersOrigin: string = req.headers.origin ? <string>req.headers.origin : '';

    if (allowOrigins.length === 1 && allowOrigins[0] === '*') origin = headersOrigin;
    else if (allowOrigins.indexOf(headersOrigin.toLowerCase()) > -1) origin = headersOrigin;
    else origin = allowOrigins[0];

    res.header('Access-Control-Allow-Origin', origin);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
}

export default ApiServer;
