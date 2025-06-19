import {
    createUser,
    signinUser,
    refreshUserToken,
    updateUserDetails,
    getUserId
  } from '../services/userService.js';
import { sendAccessToken, sendRefreshToken , verifyToken} from '../utils/tokenUtil.js';

  
  const signup = async (req, res, next) => {
    try {
      const { user, accessToken, refreshToken } = await createUser(req.body);
      // Send tokens in cookies   
      sendAccessToken(res, accessToken);
      sendRefreshToken(res, refreshToken);
      
      if (user) {
        res.status(201).json({ success: true, message: "User registered successfully", user , accessToken, refreshToken});
      } else {
        res.status(400).json({ success: false, message: 'Failed to create user' });
      }
    } catch (err) {
      next(err);
    }
  };
  
  const login = async (req, res, next) => {
    try {
      const { user, accessToken, refreshToken } = await signinUser(req.body);
      sendAccessToken(res, accessToken);
      sendRefreshToken(res, refreshToken);
      
      if (user) {
        res.status(201).json({ success: true, message: "User Login successfully", user });
      } else {
        res.status(400).json({ success: false, message: 'Login Error' });
      }
    } catch (err) {
      next(err);
    }
  };
  
  const logout = async (req, res, next) => {
    try {
      res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(200)
        .json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      next(err);
    }
  };
  
  const checkAuth = async (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
  
      if (!accessToken && !refreshToken) {
        return res.status(401).json({ success: false, message: 'No tokens provided' });
      }
  
      try {
        const decoded = verifyToken(accessToken);
        return res.status(200).json({ success: true, userId: decoded.id });
      } catch (err) {
        // Access token expired, try refresh
        if (refreshToken) {
          try {
            const newTokenData = await refreshUserToken(refreshToken);

            sendAccessToken(res, newTokenData.accessToken);
  
            return res.status(200).json({ success: true, userId: newTokenData.user.id });
          } catch (refreshErr) {
            return res.status(401).json({ success: false, message: 'Session expired' });
          }
        } else {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
      }
  
    } catch (err) {
      next(err);
    }
  };
  
  export {
    signup,
    login,
    logout,
    checkAuth
  };
  