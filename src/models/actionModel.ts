import mongoose, {Schema, Document} from "mongoose";
import { IAction } from "../interfaces/IAction";

export interface IActionModel extends IAction, Document{}

const actionSchema: Schema = new Schema({
    name:{type: String, required: true},
})

const Action = mongoose.model<IActionModel>("Action", actionSchema)

export default Action;