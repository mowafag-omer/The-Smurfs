import FriendshipService from "./service";
import Friendship from "./model"
import FriendshipController from "./controller";
import friendshipRouter from './router'

const service = new FriendshipService(Friendship)
const controller = new FriendshipController(service)

export { controller, friendshipRouter }