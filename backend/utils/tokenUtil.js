const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;

const createToken = async (user) => {
    try {
        const payload = {
            id: user.id,
            email: user.emailId,
            firstname: user.firstname,
            lastname: user.lastname
        };

        return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    } catch (error) {
        logger.error('Error creating access token:', error);
        throw error;
    }
};

const createRefreshToken = async (user) => {
    try {
        const payload = {
            id: user.id,
            email: user.emailId,
            firstname: user.firstname,
            lastname: user.lastname
        };

        return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    } catch (error) {
        logger.error('Error creating refresh token:', error);
        throw error;
    }
};

const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        logger.error('Token decoding failed:', error);
        throw new Error('Invalid token');
    }
}

const verifyToken = (token, options = { isRefresh: false }) => {
    try {
      const secret = options.isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
      return jwt.verify(token, secret);
    } catch (error) {
      logger.error('Error verifying token:', error);
      throw error;
    }
  };
  

module.exports = {
    createToken,
    createRefreshToken,
    decodeToken,
    verifyToken
};

