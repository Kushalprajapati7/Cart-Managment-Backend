import Product from "../models/productModel";
import { IProduct } from "../interfaces/productInterface";

class ProductService {
    addProduct = async(product: IProduct): Promise<IProduct> =>{
        const newProduct = new Product(product);
        return await newProduct.save();
    }

    showAllProducts = async():Promise<IProduct[]>=>{
        const products = await Product.find();
        return products;
    }
}

export default new ProductService();