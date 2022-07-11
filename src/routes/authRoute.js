import { Router } from 'express';
import { getUsers, postLogin, postRegister, putRegister, emailResetPassword, resetPassword } from '../controllers/AuthController.js';
import validateLoginData from '../middlewares/validateLoginData.js';
import validateLoginPassword from '../middlewares/validateLoginPassword.js';
import validateRegisterData from '../middlewares/validateRegisterData.js';
import { validateToken } from '../middlewares/validateToken.js';
import validateUpdatePassword from '../middlewares/validateUpdatePassword.js';
import validateUserNotExistant from '../middlewares/validateUserNotExistant.js';
import validateUserUpdateData from '../middlewares/validateUserUpdateData.js';

const router = Router();

router.post('/login', validateLoginData, validateLoginPassword, postLogin);
router.post('/register', validateRegisterData, validateUserNotExistant, postRegister);
router.put('/register', validateUserUpdateData, validateUpdatePassword, validateUserNotExistant, validateToken, putRegister);
router.post('/email-reset-password', emailResetPassword)
router.post('/reset-password', resetPassword)

// That's a test route
router.get('/users', getUsers);

export default router;