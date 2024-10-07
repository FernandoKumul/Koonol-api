import mongoose, { Schema, Document } from 'mongoose';
import { ISeller } from '../interfaces/ISellers';

export interface ISellerModel extends ISeller, Document {}

const sellerSchema: Schema = new Schema({
  name: { type: String, required: true },       
  lastName: { type: String, required: true },   
  email: { type: String, default: null },       
  photo: { type: String, default: null },      
  birthday: { type: Date, required: true },  
  gender: { type: String, required: true },          
  phoneNumber: { type: String, default: null },    
  creationDate: { type: Date, default: Date.now },  
  updateDate: { type: Date, default: Date.now }    
});

sellerSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

const Seller = mongoose.model<ISellerModel>('Seller', sellerSchema);

export default Seller;
