import { Router } from "express";
import productController from "../controller/productController";
import verifyToken from "../middleware/authMiddleware";
import upload from "../middleware/multerImage";

const router = Router();

router.post('/addProduct', productController.addProduct);
router.get('/showProducts', productController.showsProducts);

export default router