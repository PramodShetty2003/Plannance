import User from '../models/User.js';
import { hashPassword, verifyPassword } from '../utils/hashUtil.js';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken
} from '../utils/tokenUtil.js';

/**
 * Register new user
 */
export const createUser = async (userData) => {
  const { name, email, password } = userData;

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Generate tokens
  const accessToken = createAccessToken(newUser._id, newUser.name, newUser.email);
  const refreshToken = createRefreshToken(newUser._id, newUser.name, newUser.email);

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    },
    accessToken,
    refreshToken
  };
};

/**
 * Sign in user
 */
export const signinUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const accessToken = createAccessToken(user._id, user.name, user.email);
  const refreshToken = createRefreshToken(user._id, user.name, user.email);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    accessToken,
    refreshToken
  };
};

/**
 * Refresh access token
 */
export const refreshUserToken = async (refreshToken) => {
    const decoded = await verifyToken(refreshToken, { isRefresh: true });
  
    if (!decoded || !decoded.id) {
      throw new Error('Invalid refresh token');
    }
  
    // Fetch fresh user data (optional but recommended)
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');
  
    const accessToken = createToken(user._id, user.name, user.email);
  
    return {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  };
  

/**
 * Get user by ID
 */
export const getUserId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};

/**
 * Update user info
 */
export const updateUserDetails = async (userId, userData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true
  });
  if (!updatedUser) throw new Error('User not found');
  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email
  };
};
