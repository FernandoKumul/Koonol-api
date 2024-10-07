import mongoose, { Schema, Document } from 'mongoose';
import { IAssistance } from '../interfaces/IAssistance';

export interface IAssistanceModel extends IAssistance, Document {}

const assistanceSchema: Schema = new Schema({
  locationSalesStallsId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationSalesStalls', required: true },
  status: { type: Boolean, required: true },
  tariff: { type: Number, required: true, min: 0 },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

assistanceSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

const Assistance = mongoose.model<IAssistanceModel>('Assistance', assistanceSchema);

export default Assistance;
