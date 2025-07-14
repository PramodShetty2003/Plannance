import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/tokenUtil.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = verifyToken(accessToken, { isRefresh: false });
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired access token' });
    }

    req.user = decoded;

    // Calculate how many seconds remain until expiry
    if (decoded.exp) {
      req.expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    } else {
      req.expiresIn = null;
    }

    next();
  } catch (error) {
    console.error('Auth token error:', error);
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const decoded = verifyToken(refreshToken, { isRefresh: true });
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};
