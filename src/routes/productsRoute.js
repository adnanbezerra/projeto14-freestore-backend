import { Router } from "express";
import { getProducts, getProduct, updateProduct, postNewProduct } from "../controllers/ProductsController.js";
import { validateCartSchema } from '../middlewares/validateCartSchema.js'
import validateProductData from "../middlewares/validateProductData.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', validateCartSchema, updateProduct);
router.post('/new-product', validateProductData, validateToken, postNewProduct);

export default router;