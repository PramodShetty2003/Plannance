import express from 'express';
import { signup, login, logout } from '../controllers/userController.js';
import { authenticateToken, refreshTokenMiddleware } from '../middleware/authMiddleware.js';
import { refreshUserToken } from '../services/userService.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/check-auth', authenticateToken, async (req, res) => {
  if (!req.expiresIn || req.expiresIn <= 0) {
    return res.status(401).json({ message: 'Access token expired' });
  }

  res.json({
    message: 'Authenticated',
    user: req.user,
    expiresIn: req.expiresIn
  });
});

router.post(
  '/refresh',
  refreshTokenMiddleware,
  async (req, res, next) => {
    try {
      const { accessToken, user, expiresIn } = await refreshUserToken(req.cookies.refreshToken);

      return res.json({
        accessToken,
        user,
        expiresIn
      });
    } catch (err) {
      console.error('Refresh error:', err);
      next(err);
    }
  }
);

export default router;
