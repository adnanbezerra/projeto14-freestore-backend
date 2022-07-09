import { Router } from "express";
import { deleteCartProduct, insertToCart, verifyUserCart } from "../controllers/CartController.js";
import { validateCartSchema } from "../middlewares/validateCartSchema.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post('/carts', validateCartSchema, validateToken, insertToCart)
router.put('/carts/:cartId', validateCartSchema, validateToken, insertToCart)
router.get('/carts', validateToken, verifyUserCart)
router.delete('/carts/:cartId/:productId', validateToken, deleteCartProduct)

export default router;