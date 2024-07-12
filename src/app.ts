import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import connectDB from './config/database';
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import * as env from 'dotenv'
env.config()
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Connection error', err);
});
