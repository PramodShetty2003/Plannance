// models/User.js
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { generateUuid } from '../utils/uuid.js';

const userSchema = new mongoose.Schema({
  useruid: {
    type: String,
    default: generateUuid,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  settings: {
    currency: { type: String, default: 'INR' }
  },
  hasOnboarded: { type: Boolean, default: false }
},
  {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);
export default User;
