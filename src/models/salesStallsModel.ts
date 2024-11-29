import mongoose, { Schema, Document } from 'mongoose';
import { ISalesStalls } from '../interfaces/ISalesStalls';

export interface ISalesStallsModel extends ISalesStalls, Document {}

const salesStallsSchema: Schema = new Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },  
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }, 
  name: { type: String, required: true },      
  photos: { type: [String], required: true },   
  description: { type: String, required: true },
  type: { type: Boolean, required: true },       
  probation: { type: Boolean, required: true },  
  active: { type: Boolean, required: true },     
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }   
});

salesStallsSchema.virtual('locations', {
  ref: 'LocationSalesStalls',
  localField: '_id',
  foreignField: 'salesStallsId'
});

salesStallsSchema.set('toObject', { virtuals: true });
salesStallsSchema.set('toJSON', { virtuals: true });


salesStallsSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

const SalesStalls = mongoose.model<ISalesStallsModel>('SalesStalls', salesStallsSchema);

export default SalesStalls;
