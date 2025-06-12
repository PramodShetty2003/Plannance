import express from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

//Create Access Token

const createAccessToken = (user) => {
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

const createRefreshToken = (id, username, email) => {
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
const verifyToken = (token, options = { isRefresh: false }) => {
    try {
        const secret = options.isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
        return jwt.verify(token, secret);
    } catch (err) {
        console.log(err);
    }
};


//Send Access Token via Cookie
const sendAccessToken = (res, token) => {
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 10 * 60 * 1000, // 10 minutes
    }).status(201)
        .json({ success: true, user: { id: user._id, name: user.name, email: user.email } });;
};

//Send Refresh Token via Cookie
const sendRefreshToken = (res, token) => {
    res.cookie('refresh_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/api/auth/refresh-token',
        maxAge: 7 * 24 * 60 * 60 * 1000,//7 days
    }).status(201)
        .json({ success: true, user: { id: user._id, name: user.name, email: user.email } });;
};

export {
    createAccessToken,
    createRefreshToken,
    verifyToken,
    sendAccessToken,
    sendRefreshToken,
}
