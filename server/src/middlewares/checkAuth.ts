import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/jwt';
import ApiError from '../helpers/ApiError';

const checkAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;    
    if (!authorization) throw new ApiError(401, "Unauthorized user");

    let token = authorization.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized user");

    verifyToken(token)
    next()
  } catch (error) {
    throw new ApiError(401, "Unauthorized user")
  }
}

export default checkAuth