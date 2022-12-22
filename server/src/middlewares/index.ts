import express from 'express'
import cors from 'cors'

const middlewares = {
  json: express.json(),
  urlencoded: express.urlencoded({ extended: true }),
  cors: cors({
    origin:'*', 
    credentials: true, 
    exposedHeaders: '*'
  }),
}

export default middlewares