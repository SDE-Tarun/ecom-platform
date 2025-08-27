import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/payments', paymentRoutes);  


app.get('/', (req, res) => res.send('API is running...'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
