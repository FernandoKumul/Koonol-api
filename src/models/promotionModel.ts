import mongoose, { Schema, Document } from 'mongoose';
import { IPromotion } from '../interfaces/IPromotion';

export interface IPromotionModel extends IPromotion, Document {}

const promotionSchema: Schema = new Schema({
  salesStallId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesStalls', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pay: { type: Number, required: true, min: 0 }
});

const Promotion = mongoose.model<IPromotionModel>('Promotion', promotionSchema);

export default Promotion;
