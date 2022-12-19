import { Router, Request, Response } from "express"
import { userRouter } from "../modules/user"

const rootRouter: Router= Router()

rootRouter.get("/", (_: Request, res: Response) => {
  res.json("API V1")
})

const routes = {
  '/': rootRouter,
  '/user': userRouter
}

export default routes;