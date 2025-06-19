import express from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Check if the JWT secrets are defined
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not defined in .env");
  }  

//Create Access Token
export const createAccessToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: '10m', // 10 minutes
        });
    } catch (err) {
        console.log(err);
    }
};

//Create Refresh Token

export const createRefreshToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    } catch (err) {
        console.log(err);
    }
};

//Verify Token
export const verifyToken = (token, options = { isRefresh: false }) => {
    try {
        const secret = options.isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
        return jwt.verify(token, secret);
    } catch (err) {
        console.log(err);
    }
};

// Set Access Token in cookie
export const sendAccessToken = (res, token) => {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 10 * 60 * 1000,
    });
  };
  
  // Set Refresh Token in cookie
  export const sendRefreshToken = (res, token) => {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/api/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };
