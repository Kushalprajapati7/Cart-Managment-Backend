import { Router } from 'express';
import { register, login, allUser } from '../controller/authController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', verifyToken,allUser);

export default router;
