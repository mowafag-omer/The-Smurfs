import { Schema, model, Document } from 'mongoose';

export interface IFriendship extends Document {
  _id?: object,
  firsttUser: string,
  secondUser: string,
  status: string,
  date: Date
}

const friendshipSchema =  new Schema<IFriendship>({
  firsttUser: { type: String, required: true },
  secondUser: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: new Date() }
})

export default model<IFriendship>('friendship', friendshipSchema)