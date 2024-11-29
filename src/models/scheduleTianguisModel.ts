import mongoose, { Schema, Document } from 'mongoose';
import { IScheduleTianguis } from '../interfaces/IScheduleTianguis';

export interface IScheduleTianguisModel extends IScheduleTianguis, Document {}

const scheduleTianguisSchema: Schema = new Schema({
  tianguisId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tianguis', required: true },
  dayWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

scheduleTianguisSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

const ScheduleTianguis = mongoose.model<IScheduleTianguisModel>('ScheduleTianguis', scheduleTianguisSchema);

export default ScheduleTianguis;
