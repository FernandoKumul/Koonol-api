import mongoose, { Schema, Document } from 'mongoose';
import { ITianguis } from '../interfaces/ITianguis';

export interface ITianguisModel extends ITianguis, Document {}

const tianguisSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    dayWeek: { type: String, required: true }, 
    photo: { type: String, default: null },
    indications: { type: String, required: true },
    markerMap: {
      type: { type: String, enum: ['Point'], required: true }, // Solo aceptamos "Point"
      coordinates: { type: [Number], required: true } // Array de longitud y latitud
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    locality: { type: String, required: true },
    active: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
  });
  
tianguisSchema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

tianguisSchema.index({ markerMap: '2dsphere' });

const Tianguis = mongoose.model<ITianguisModel>('Tianguis', tianguisSchema);

export default Tianguis;
