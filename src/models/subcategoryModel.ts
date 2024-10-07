import mongoose, { Schema, Document } from 'mongoose';
import { ISubcategory } from '../interfaces/ISubcategory';

export interface ISubcategoryModel extends ISubcategory, Document {}

const subcategorySchema: Schema = new Schema({
  name: { type: String, required: true },  
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Subcategory = mongoose.model<ISubcategoryModel>('SubCategory', subcategorySchema);

export default Subcategory;
