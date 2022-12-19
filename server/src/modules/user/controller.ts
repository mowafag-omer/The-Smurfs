import { Request, Response, NextFunction } from "express";
import ApiError from "../../helpers/apiError";
import { IUserService } from "./service";


interface IUserController {
  userService: IUserService
  register(req: Request, res: Response, next: NextFunction): any;
}

export default class UserController implements IUserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.register(req.body)
      if (!result.success) throw new ApiError(409, result.message);
      res.header('Authorization', 'Bearer '+ result.payload);
      res.status(201).json()
      
    } catch (error) {
      next(error);
    }
  }
  
}