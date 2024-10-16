import mongoose, {Schema, Document} from "mongoose";
import { IPermissions } from "../interfaces/IPermissions";

export interface IPermissionModel extends IPermissions, Document{}

const permissionSchema : Schema = new Schema({
    rolId: { type: mongoose.Schema.Types.ObjectId, ref: "Rol", required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
    actionId: { type: mongoose.Schema.Types.ObjectId, ref: "Action", required: true },
});

const Permission = mongoose.model<IPermissionModel>("Permission", permissionSchema);

export default Permission;