import mongoose, {Schema, Document} from "mongoose";
import { IRol } from "../interfaces/IRol";

export interface IRolModel extends IRol, Document{}

const rolSchema: Schema = new Schema({
    name: { type: String, required: true }
  });

const Rol = mongoose.model<IRol>("Rol", rolSchema);

export default Rol;