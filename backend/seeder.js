import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import products from './data/products.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products Seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
