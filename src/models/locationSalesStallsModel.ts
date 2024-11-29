import mongoose, { Schema, Document } from 'mongoose';
import { ILocationSalesStalls } from '../interfaces/ILocationSalesStalls';

export interface ILocationSalesStallsModel extends ILocationSalesStalls, Document {}

const locationSalesStallsSchema: Schema = new Schema({
    salesStallsId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesStalls', required: true },
    scheduleTianguisId: { type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleTianguis', required: true },
    markerMap: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    },
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
  });
  
  locationSalesStallsSchema.pre('save', function (next) {
    this.updateDate = new Date();
    next();
  });
  
  locationSalesStallsSchema.index({ markerMap: '2dsphere' });
  
  const LocationSalesStalls = mongoose.model<ILocationSalesStallsModel>('LocationSalesStalls', locationSalesStallsSchema);
  
  export default LocationSalesStalls;