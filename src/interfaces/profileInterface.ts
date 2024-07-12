import { IUser } from "../interfaces/userInterface";
import mongoose,{Types} from "mongoose";

export interface IProfile{
    _id?:Types.ObjectId;
    UserId: IUser['_id'];
    name:string;
    dob:Date;
    email:string;
    gender:string
}