import { Router } from 'express';
import { postLogin, postRegister } from '../controllers/AuthController.js';
import validateRegisterData from '../middlewares/validateRegisterData.js';
import validateUserNotExistant from '../middlewares/validateUserNotExistant.js';

const router = Router();

router.post('/login', postLogin);
router.post('/register', validateRegisterData, validateUserNotExistant, postRegister);
router.delete('/logout')
router.put('/register')

export default router;