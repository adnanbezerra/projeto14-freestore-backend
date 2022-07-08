import { Router } from "express";
import { insertToCart, verifyUserCart } from "../controllers/CartController.js";
import { validatideCartSchema } from "../middlewares/validateCartSchema.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post('/carts', validatideCartSchema, validateToken, insertToCart)
router.put('/carts/:cartId', validatideCartSchema, validateToken, insertToCart)
router.get('/carts', validateToken, verifyUserCart)

export default router;