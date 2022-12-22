import { IFriendship } from "./model";
import { Model } from 'mongoose'

export interface IFriendshipService {
  friendship: Model<IFriendship>
  sendRequest(params: IFriendship): Promise<any>
  acceptFriendship(params: { firstUser: string, secondUser: string }): Promise<any>
  getFriendShipsById(id: string): Promise<any>
  unfriend(params: { firstUser: string, secondUser: string }): Promise<any>
}

export default class FriendshipService implements IFriendshipService {
  friendship: Model<IFriendship>

  constructor(friendship: Model<IFriendship>) {
    this.friendship = friendship
  }

  async sendRequest(params: IFriendship) {
    const { firstUser, secondUser } = params
    const fristFriendship = await this.friendship.findOne({firstUser, secondUser})
    const secondFriendship = await this.friendship.findOne({firstUser: secondUser, secondUser: firstUser})
    if (!!fristFriendship || !!secondFriendship)
      return { success: false, message: "Request has been already sent !" }

    const friendshipReq = await this.friendship.create({firstUser, secondUser, status: 'requested'})  
    return { success: true, friendshipReq }
  }

  async acceptFriendship(params: { firstUser: string, secondUser: string }) {
    const {firstUser, secondUser } = params
    const existedFriendship = await this.friendship.findOne({firstUser, secondUser})
    if (!existedFriendship) return { success: false, message: "Bad request"}
    existedFriendship.status = "accepted"
    const updatedFriendship = await existedFriendship.save()
    return {
      success: true,
      updatedFriendship,
      message: "Friendship accepted successfully"
    }
  }

  async getFriendShipsById(id: string) {
    const friendships = await this.friendship.find({$or: [{firstUser: id}, {secondUser: id}]})
    return !friendships.length 
      ? { message: "No friendships were founded !", friendships: null }
      : { friendships }
  }

  async unfriend(params: { firstUser: string, secondUser: string }) {
    const { firstUser, secondUser } = params
    await this.friendship.deleteOne({firstUser: firstUser, secondUser: secondUser})
    await this.friendship.deleteOne({firstUser: secondUser, secondUser: firstUser})
    return { success: true }
  }
}