import { Router } from 'express';
import { registerUser, loginUser, me } from '../controllers/authController.js'; // Ensure these are correct
import { verifyJWT } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerUser); // Use registerUser instead of register
router.post('/login', loginUser);
router.get('/me', verifyJWT, me);

export default router;