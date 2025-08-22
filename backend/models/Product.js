import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  image: { type: String }, // image URL
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
