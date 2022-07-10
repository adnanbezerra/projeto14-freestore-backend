import { Router } from "express";
import { getSell, registerSell } from "../controllers/SellsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post('/sells', validateToken, registerSell)
router.get('/sells', validateToken, getSell)

export default router;