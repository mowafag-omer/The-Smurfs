import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { controller } from ".";

const friendshipRouter: Router = Router()

friendshipRouter.post("/sendFriendRequest", checkAuth, (req, res, next) => 
  controller.sendRequest(req, res, next)
)

friendshipRouter.put("/acceptRequest", (req, res, next) => 
  controller.acceptFriendship(req, res, next)
)

friendshipRouter.get("/getFriendships", (req, res, next) => 
  controller.getFriendships(req, res, next)
)

friendshipRouter.post("/unfriend", (req, res, next) => 
  controller.unfriend(req, res, next)
)

export default friendshipRouter