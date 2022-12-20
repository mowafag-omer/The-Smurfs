import { IUser } from "./model";
import { Model } from 'mongoose'
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/jwt";
import filterUsersData from "../../helpers/filterUsersData";


export interface IUserService {
  user: Model<IUser>
  register(params: IUser): Promise<any>
  login(params: { userName: string, password: string }): Promise<any>
  getUsers(): Promise<any>
  modifyRole(params: { _id: string, role: string }): Promise<any>
}

export default class UserService implements IUserService {
  user: Model<IUser>

  constructor(user: Model<IUser>) {
    this.user = user
  } 

  async register(params: IUser) {
    const { userName, password, role } = params

    const userExist = await this.user.findOne({userName})
    if (userExist) return { success: false, message: "User already exist !" }

    const hashedPass = await bcrypt.hash(password, 10)
    
    const newUser = await this.user.create({ userName, password: hashedPass, role })
    const token = generateToken({
      _id: newUser._id.toString(), 
      userName: newUser.userName,
      role: newUser.role
    })

    return { success: true, token }
  }

  async getUsers() {
    const users = await this.user.find()
    return filterUsersData(users) 
  }

  async login(params: { userName: string, password: string }) {
    const { userName, password } = params

    const existedUser = await this.user.findOne({userName})
    if (!existedUser) return { success: false, message: "Incorrect email or password" }
    
    const checkPass = bcrypt.compareSync(password, existedUser.password)
    if (!checkPass) return { success: false, message: "incorrect email or password" }

    const token = generateToken({
      _id: existedUser._id.toString(), 
      userName: existedUser.userName,
      role: existedUser.role
    })

    return { success: true, token };
  }

  async modifyRole(params: { _id: string, role: string }) {
    const existedUser = await this.user.findOne({ _id: params._id })
    if (!existedUser) return { success: false, message: 'Bad request' }
    existedUser.role = params.role
    const updatedUser = await existedUser.save()
    const { _id, userName, role } = updatedUser
    return { 
      success: true, 
      updatedUser: { _id: _id.toString(), userName, role },
      message: "Role updated successfully !"
    } 
  }
}