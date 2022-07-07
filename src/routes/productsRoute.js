import { Router } from "express";
import { getProducts } from "../controllers/ProductsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/products', validateToken, getProducts)

export default router;