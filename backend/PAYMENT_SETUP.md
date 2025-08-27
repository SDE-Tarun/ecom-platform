# Payment Integration Setup Guide

## Razorpay Integration

This project includes Razorpay payment integration. Follow these steps to set it up:

### 1. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
```

### 2. Get Razorpay Credentials

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings > API Keys
3. Generate a new key pair
4. Copy the Key ID and Key Secret to your .env file

### 3. Test Mode

The integration is currently set up for test mode. Use these test card details:
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

### 4. Production Mode

For production, replace the test keys with live keys and update the key in `frontend/src/utils/razorpay.js`.

## Features Implemented

1. **Size Selection Required**: Users must select a size before adding to cart
2. **Cart Persistence**: Cart data is saved to localStorage and persists across page refreshes
3. **Buy Now Button**: Direct purchase option on product pages
4. **Cart Checkout**: Buy all items in cart with one click
5. **Payment Verification**: Backend verification of Razorpay payments
6. **Order Management**: Complete order creation and payment flow

## API Endpoints

- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment signature 