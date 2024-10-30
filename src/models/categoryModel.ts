import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

export interface ICategoryModel extends ICategory, Document {}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },  
  recommendedRate: { type: Number, required: true, min: 0 },
  creationDate: { type: Date, default: Date.now },
});

const Category = mongoose.model<ICategoryModel>('Category', categorySchema);

export default Category;
