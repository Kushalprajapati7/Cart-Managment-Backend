import { Request, Response } from "express";
import productServices from "../services/productServices";

class ProductController {
    addProduct = async (req:Request, res:Response):Promise<void> => {
        try {
            const productData = req.body;
            productData.image =  req.file?.path;
            const newProduct = await productServices.addProduct(productData);
            res.status(201).json(newProduct);
        }
        catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }

    showsProducts = async (req:Request, res:Response):Promise<void> => {
        try {
            const products = await productServices.showAllProducts();
            res.status(201).json(products);
        } catch (error:any) {
            res.status(500).json({ message: error.message })
            
        }
    }
}

export default new ProductController(); 