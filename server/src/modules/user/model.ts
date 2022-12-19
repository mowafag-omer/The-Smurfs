import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string,
  password: string,
  role: string
}

const userSchema =  new Schema<IUser>({
  userName: { type: String, required: true},
  password: { type: String, required: true},
  role: { type: String, required: true}
})

export default model<IUser>('users', userSchema)