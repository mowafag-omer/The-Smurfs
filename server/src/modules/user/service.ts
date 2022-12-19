import { IUser } from "./model";
import { Model } from 'mongoose'
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/jwt";


export interface IUserService {
  user: Model<IUser>
  register(props: IUser): Promise<any>
}

export default class UserService implements IUserService {
  user: Model<IUser>

  constructor(user: Model<IUser>) {
    this.user = user
  } 

  async register(props: IUser) {
    const { userName, password, role } = props

    const userExist = await this.user.find({userName})
    if (userExist.length) {
      return { success: false, message: "User already exist !" }
    }

    const hashedPass = await bcrypt.hash(password, 10)
    props.password = hashedPass
    
    const newUser = await this.user.create({ userName, password, role })
    const token = generateToken({
      _id: newUser._id.toString(), 
      userName: newUser.userName,
      role: newUser.role
     })
    return {  
      success: true,
      payload: token,
    };
 }
}