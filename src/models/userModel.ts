import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
  rolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true }, 
 
  photo: { type: String, default: null },
 
  birthday: { type: Date },
  gender: { type: String },
  phoneNumber: { type: String },
 
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});
 
userSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

const User = mongoose.model<IUserModel>('User', userSchema);
export default User;
