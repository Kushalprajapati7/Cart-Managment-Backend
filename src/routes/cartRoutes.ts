import cartController from "../controller/cartController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
const router = Router();

router.post('/addToCart/:productId', verifyToken, cartController.addToCart)
router.get('/showCart/:profileId', verifyToken, cartController.showCart)
router.delete('/deleteFromCart/:productId', verifyToken, cartController.deleteFromCart)
router.get('/shoAllCart', verifyToken, cartController.showAllCart)

export default router;