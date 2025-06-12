import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';

const app = express();

// If hosted behind proxy like Heroku/Render/Vercel
app.set('trust proxy', 1);

// Basic security & middleware
app.use(helmet());
app.use(cors({
  origin: true, // Use exact domain in production
  credentials: true,
}));
app.use(cookieParser());
app.use(json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server after Mongo connection
const startServer = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

startServer();
