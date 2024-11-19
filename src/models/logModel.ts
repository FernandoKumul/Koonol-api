import mongoose, { Schema, Document } from "mongoose";
import { ILog } from "../interfaces/ILog";

interface ILogModel extends ILog, Document {}

const requestSchema = new Schema({
  method: { type: String, required: true },
  endpoint: { type: String, required: true },
  body: { type: Object, required: false },
});

const errorMessageSchema = new Schema({
  message: { type: String, required: true },
});

const responseSchema = new Schema({
  success: { type: Boolean, required: true },
  statusCode: { type: Number, required: true },
  message: { type: String, required: true },
  data: { type: Object, required: false },
  errorMessages: { type: [errorMessageSchema], required: false }, 
});

const logSchema = new Schema<ILogModel>({
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, required: false },
  ipAddress: { type: String, required: true },
  request: { type: requestSchema, required: true },
  response: { type: responseSchema, required: true },
});

const Log = mongoose.model<ILogModel>("Log", logSchema);

export default Log;
