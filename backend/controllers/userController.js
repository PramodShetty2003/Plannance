import {
  createUser,
  signinUser,
  refreshUserToken,
  updateUserDetails,
  getUserId
} from '../services/userService.js';
import { sendRefreshToken, verifyToken } from '../utils/tokenUtil.js';


const signup = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await createUser(req.body);
    // Send tokens in cookies   
    sendRefreshToken(res, refreshToken);

    if (user) {
      res.status(201).json({ success: true, message: "User registered successfully", user, accessToken, expiresIn: 10 * 60 });
    } else {
      res.status(400).json({ success: false, message: 'Failed to create user' });
    }
  } catch (err) {
    console.error('Signup failed:', err.message);
    res.status(400).json({ success: false, message: err.message || 'Signup failed' });
  }
};

// Update login response
const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await signinUser(req.body);

    // Only send refresh token in HTTP-only cookie
    sendRefreshToken(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      accessToken,
      expiresIn: 10 * 60
    });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(401).json({
      success: false,
      message: err.message || 'Login failed'
    });
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie('refreshToken')
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

export {
  signup,
  login,
  logout
};
