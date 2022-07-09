import { Router } from "express";
import { registerSell } from "../controllers/SellsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post('/sells', validateToken, registerSell)

export default router;