import { Router } from "express";
import { getProducts, getProduct, updateProduct } from "../controllers/ProductsController.js";
import { validateCartSchema } from '../middlewares/validateCartSchema.js'

const router = Router();

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.put('/products/:id', validateCartSchema, updateProduct)

export default router;