import { Router } from "express";
import { controller } from ".";
import checkAuth from "../../middlewares/checkAuth";

const userRouter: Router = Router()

userRouter.post("/register", (req, res, next) => 
  controller.register(req, res, next)
)

userRouter.post("/login", (req, res, next) => 
  controller.login(req, res, next)
)

userRouter.get("/getAllUsers", (req, res, next) => 
  controller.getUsers(req, res, next)
)

userRouter.put("/modify", checkAuth, (req, res, next) => 
  controller.modifyRole(req, res, next)
)

export default userRouter