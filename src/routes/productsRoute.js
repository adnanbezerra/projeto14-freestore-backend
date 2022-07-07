import { Router } from "express";
import { getProducts } from "../controllers/ProductsController.js";

const router = Router();

router.get('/products', getProducts)

export default router;