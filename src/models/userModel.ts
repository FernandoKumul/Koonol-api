import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;