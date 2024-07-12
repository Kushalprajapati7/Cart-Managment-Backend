import mongoose,{Document,Schema} from "mongoose";
import { IProduct } from "../interfaces/productInterface";

const ProductSchema: Schema = new Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"]
    },
    price:{
        type:Number,
        required:[true,"please enter price"]
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    imageUrl:{
        type:String,
        required:[true,"please enter image"]
    },
    quantity:{
        type:Number,
        required:[true,"please enter quantity"]
    }
})

const Product = mongoose.model<IProduct>('Product',ProductSchema);
export default Product;