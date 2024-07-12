import Cart from "../models/cartModel";
import { ICart } from "../interfaces/cartInterface";
import Profile from "../models/profileModel";
import { IProfile } from "../interfaces/profileInterface";
import { ObjectId, Types } from "mongoose";
import Product from "../models/productModel";


class CartServices {
  addIntoCart = async (userId: string, profileId: string, productId: Types.ObjectId, quantity: number): Promise<any> => {
    let cart: ICart | null = await Cart.findOne({ profileId: profileId });
    console.log(cart);
    const profile: IProfile | null = await Profile.findOne({ _id: profileId });

    // if(!profile){
    //     throw new Error("Authorization Error!!");
    // }
    // if (profileId != profile._id?.toString() || userId != profile.UserId?.toString()) {
    //     throw new Error("Authorization Error!!");
    // }
    if (!cart) {
      cart = new Cart();
      cart.items.push({ productId, quantity })
      const product = await Product.findOne({ _id: productId });
      cart.profileId = new Types.ObjectId(profileId);
      cart.userId = new Types.ObjectId(userId);
      cart.total = product?.price as number * quantity;
      const newCart = await cart.save();
      return newCart;
    }
    else {
      const product = cart.items.find((item) => item.productId === productId);
      const prod = await Product.findOne({ _id: productId });

      if (!prod) {
        return
      }
      if (product) {
        product.quantity = quantity;
        cart.total = prod?.price as number * quantity
      }
      else {

        cart.items.push({ productId, quantity })
        const prod = await Product.findOne({ _id: productId });
        cart.total = prod?.price as number * quantity + cart.total;
        console.log(cart.total);

      }
      const exisingCart = await cart.save();
      return exisingCart

    }
  }

  showCart = async (profileId: string): Promise<any> => {
    // let cart: ICart | null = await Cart.findOne({ profileId: profileId });
    // if(!cart){
    //     throw new Error('Cart Not Found For this Profile')
    // }
    const pipeline = [
      {
        $match: {
          profileId: new Types.ObjectId(profileId)
        }
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $group: {
          _id: "$_id",
          total: { $first: "$total" },
          items: {
            $push: {
              product: "$productDetails",
              quantity: "$items.quantity"
            }
          },
          profileId: { $first: "$profileId" },
          userId: { $first: "$userId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" }
        }
      }
    ];


    const cart = await Cart.aggregate(pipeline);
    return cart.length > 0 ? cart[0] : null;

  }

  deleteFromCart = async (userId: string, profileId: string, productId: Types.ObjectId): Promise<void> => {
    let cart: ICart | null = await Cart.findOne({ profileId: profileId });
    const profile: IProfile | null = await Profile.findOne({ _id: profileId });

    if (!cart) {
      throw new Error('Cart Not Found')
    }
    else {
      const product = cart.items.findIndex((item) => item.productId.toString() == productId.toString());
      if (product != -1) {
        cart.items.splice(product, 1);
        await cart.save();
      } else {
        throw new Error(`${productId} is not in cart`);
      }
    }
  }

  showAllCarts = async (): Promise<any[]> => {
    const pipeline = [
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $group: {
          _id: "$_id",
          total: { $first: "$total" },
          items: {
            $push: {
              product: "$productDetails",
              quantity: "$items.quantity"
            }
          },
          profileId: { $first: "$profileId" },
          userId: { $first: "$userId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" }
        }
      }
    ];
  
    const carts = await Cart.aggregate(pipeline);
    return carts;
  }
}

 


export default new CartServices();