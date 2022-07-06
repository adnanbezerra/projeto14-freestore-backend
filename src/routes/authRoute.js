import { Router } from 'express';
import { postLogin, postRegister } from '../controllers/AuthController.js';
import validateLoginData from '../middlewares/validateLoginData.js';
import validateLoginPassword from '../middlewares/validateLoginPassword.js';
import validateRegisterData from '../middlewares/validateRegisterData.js';
import validateUserNotExistant from '../middlewares/validateUserNotExistant.js';

const router = Router();

router.post('/login', validateLoginData, validateLoginPassword, postLogin);
router.post('/register', validateRegisterData, validateUserNotExistant, postRegister);
router.delete('/logout')
router.put('/register')

export default router;