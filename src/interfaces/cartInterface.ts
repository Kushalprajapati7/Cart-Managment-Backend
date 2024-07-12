import mongoose,{Types} from "mongoose";
import { IProfile } from "./profileInterface";
import { IUser } from "./userInterface";
import { IProduct } from "./productInterface";

export interface ICart extends Document {
    save(): unknown;
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    profileId: Types.ObjectId;
    items: Array<{
        productId: Types.ObjectId;
        quantity: number;
    }>;
    total: number;
}
