import { Request, Response, NextFunction } from "express"
import { IFriendshipService } from "./service"
import ApiError  from "../../helpers/apiError"

interface IFriendshipController {
  friendshipService: IFriendshipService
  sendRequest(req: Request, res: Response, next: NextFunction): void
  acceptFriendship(req: Request, res: Response, next: NextFunction): void
}

export default class FriendshipController implements IFriendshipController {
  friendshipService: IFriendshipService

  constructor(friendshipService: IFriendshipService) {
    this.friendshipService = friendshipService
  }

  async sendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.friendshipService.sendRequest(req.body)
      if (!result.success) throw new ApiError(409, result.message)
      res.status(200).json({ payload: result.friendshipReq })
    } catch (error) {
      next(error)
    }
  }

  async acceptFriendship(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.friendshipService.acceptFriendship(req.body)
      if (!result.success) throw new ApiError(400, result.message)
      res.status(200).json({ message: result.message, payload: result.updatedFriendship})
    } catch (error) {
      next(error)
    }
  }

  async getFriendships(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.query.id?.toString() || ''
      const result = await this.friendshipService.getFriendShipsById(id)
      !result.friendships 
        ? res.status(204).json({ message: result.message, payload: null })
        : res.status(200).json({ payload: result.friendships })
    } catch (error) {
      next(error)
    }
  }

  async unfriend(req: Request, res: Response, next: NextFunction) {
    try {
      await this.friendshipService.unfriend(req.body)
      res.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}