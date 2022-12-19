import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log('==============errorHangler======================');
  console.log(err);
  console.log('====================================');
  const status = err.status || 500;
  const msg = status == 500 ? "Sonething went wrong !" : err.message
  res.status(status).json(msg);
};

export default errorHandler;