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
  const { username, email, password } = userData;

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });

  // Generate tokens
  const accessToken = createAccessToken(newUser._id, newUser.username, newUser.email);
  const refreshToken = createRefreshToken(newUser._id, newUser.username, newUser.email);

  return {
    user: {
      id: newUser._id,
      username: newUser.username,
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

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
      throw new Error('User already exists with this email');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const accessToken = createAccessToken(user._id, user.username, user.email);
  const refreshToken = createRefreshToken(user._id, user.username, user.email);

  return {
    user: {
      id: user._id,
      username: user.username,
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
        username: user.username,
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
    username: user.username,
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
    username: updatedUser.username,
    email: updatedUser.email
  };
};
