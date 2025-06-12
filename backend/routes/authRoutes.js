import express from 'express';
import { signup, login, logout, checkAuth } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', checkAuth);

export default router;
