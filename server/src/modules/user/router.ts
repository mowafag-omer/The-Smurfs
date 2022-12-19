import { Router } from "express";
import { controller } from ".";

const userRouter: Router = Router()

userRouter.post("/register", (req, res, next) => 
  controller.register(req, res, next)
)

export default userRouter