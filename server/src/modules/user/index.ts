import UserService from "./service";
import User from "./model"
import UserController from "./controller";
import userRouter from "./router";

const service = new UserService(User)
const controller = new UserController(service)

export { controller, userRouter }