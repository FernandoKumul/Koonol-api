import mongoose, {Schema, Document} from "mongoose";
import { IMenu } from "../interfaces/IMenu";

export interface IMenuModel extends IMenu, Document{}

const menuSchema: Schema = new Schema({
    name: { type: String, required: true },
    ico: { type: String, default: null },
})

const Menu = mongoose.model<IMenuModel>("Menu", menuSchema)

export default Menu;