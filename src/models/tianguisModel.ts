import mongoose, { Schema, Document } from "mongoose";
import { ITianguis } from "../interfaces/ITianguis";

export interface ITianguisModel extends ITianguis, Document {}

const tianguisSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  photo: { type: String, default: null },
  indications: { type: String, required: true },
  markerMap: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  locality: { type: String, required: true },
  active: { type: Boolean, default: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

// Middleware para actualizar la fecha de modificación
tianguisSchema.pre("save", function (next) {
  this.updateDate = new Date();
  next();
});

// Índice geoespacial
tianguisSchema.index({ markerMap: "2dsphere" });

// Campo virtual para asociar los horarios (schedule)
tianguisSchema.virtual("schedule", {
  ref: "ScheduleTianguis", // Nombre del modelo relacionado
  localField: "_id",       // Campo en Tianguis
  foreignField: "tianguisId", // Campo en ScheduleTianguis
});

// Habilitar la serialización de virtuales en las respuestas
tianguisSchema.set("toJSON", { virtuals: true });
tianguisSchema.set("toObject", { virtuals: true });

const Tianguis = mongoose.model<ITianguisModel>("Tianguis", tianguisSchema);

export default Tianguis;
