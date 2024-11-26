import mongoose, { Schema, Document } from 'mongoose';
import { IPromotion } from '../interfaces/IPromotion';

export interface IPromotionModel extends IPromotion, Document {}

const promotionSchema: Schema = new Schema({
  salesStallId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesStalls', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pay: { type: Number, required: true, min: 0 },
  creationDate: { type: Date, default: Date.now }

});

const Promotion = mongoose.model<IPromotionModel>('Promotion', promotionSchema);

export default Promotion;
