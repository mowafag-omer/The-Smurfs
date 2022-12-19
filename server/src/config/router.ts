import { Router, Request, Response } from "express"

const rootRouter: Router= Router()

rootRouter.get("/", (_: Request, res: Response) => {
  res.json("API V1")
})

const routes = {
  '/': rootRouter
}

export default routes;