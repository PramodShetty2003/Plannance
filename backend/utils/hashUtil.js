// hashUtil.js
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // Recommended: 10–14

// Hash the plain text password
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Compare plain password with hashed password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
