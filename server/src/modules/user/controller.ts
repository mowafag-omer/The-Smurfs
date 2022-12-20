import { Request, Response, NextFunction } from "express"
import ApiError from "../../helpers/apiError"
import { IUserService } from "./service"

interface IUserController {
  userService: IUserService
  register(req: Request, res: Response, next: NextFunction): void
  login(req: Request, res: Response, next: NextFunction): void
  modifyRole(req: Request, res: Response, next: NextFunction): void
}

export default class UserController implements IUserController {
  userService: IUserService

  constructor(userService: IUserService) {
    this.userService = userService
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.register(req.body)
      if (!result.success) throw new ApiError(409, result.message)
      res.header('Authorization', 'Bearer '+ result.token)
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.login(req.body)
      if (!result.success) throw new ApiError(401, result?.message)
      res.header('Authorization', 'Bearer '+ result.token)
      res.status(201).json()
    } catch (error) {
      next(error)
    }
  }  

  async modifyRole(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.modifyRole(req.body)
      if (!result.success) throw new ApiError(400, result.message)
      res.status(200).json(result.message)
    } catch (error) {
      next(error)
    }
  }  
}