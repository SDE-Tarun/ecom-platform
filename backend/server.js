import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);  


app.get('/', (req, res) => res.send('API is running...'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
