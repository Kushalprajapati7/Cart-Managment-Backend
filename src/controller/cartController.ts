import cartServices from "../services/cartServices";
import { Request, Response } from "express";
import CustomRequest from "../types/customRequest";
import { Types } from "mongoose";

class CartController {
    addToCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = req.params.productId;
            const { profileId, quantity } = req.body;
            const userId = (req as CustomRequest).userId;

            if (productId !== undefined && userId !== undefined) {
                const cart = await cartServices.addIntoCart(userId, profileId, new Types.ObjectId(productId), quantity)
                res.status(200).json({ Cartdata: cart });
            }

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    showCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const profileId = req.params.profileId;
            const cart = await cartServices.showCart(profileId);
            res.status(200).json({ cart });
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    deleteFromCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = req.params.productId;
            const { profileId } = req.body;
            const userId = (req as CustomRequest).userId;
            if (productId !== undefined && userId !== undefined) {
                await cartServices.deleteFromCart(userId, profileId as string, new Types.ObjectId(productId))
                res.status(200).json({ message: `${productId} is remove from cart successfully` });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    showAllCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const cart = await cartServices.showAllCarts();
            res.status(200).json(cart);

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }
}

export default new CartController();