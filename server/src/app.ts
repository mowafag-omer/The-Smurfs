import express from 'express';
import Server from './config/server'
import mongoose from 'mongoose';
import middlewares from './middlewares';
import routes from './config/router'
import errorHandler from './middlewares/errorHandler';
import config from './config/constants'

const app = express();

const server = new Server(app);

server.connecteDB(mongoose)
server.middlewares(middlewares);
server.routes(routes)
server.errorHandler(errorHandler)
server.start(config.PORT)
