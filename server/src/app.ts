import express from 'express';
import Server from './config/server'
import mongoose from 'mongoose';
import routes from './config/router'
import config from './config/constants'

const app = express();

const server = new Server(app);

server.connecteDB(mongoose)
server.routes(routes)
server.start(config.PORT);
