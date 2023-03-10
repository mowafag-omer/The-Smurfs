import { Application} from 'express'
import { Mongoose } from 'mongoose';
import config from './constants';

class Server {
  app: Application
  constructor(app: Application) {
    this.app = app
  }

  connecteDB(mongoose: Mongoose) {
  mongoose
    .connect(config.MONGO_URL, { retryWrites: true, w: 'majority' })
      .then(() => {
        console.log('Connected to mongoDB.');
      })
      .catch((error: any) => {
        console.error('Unable to connect.');
        console.error(error);
      });
  }

  middlewares(middlewares: any) {
    for (const key in middlewares) {
      this.app.use(middlewares[key]);
    }
  }

  routes(routes: any) {
    for (const path in routes) {
      this.app.use(`${path}`, routes[path]);
    }
  }

  errorHandler(errorHandler: any) {
    this.app.use(errorHandler);
  }

  start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`[App]: Listening on port ${port}`);
    });
  }
}

export default Server;