# 🔧 Razorpay Payment Integration Setup Guide

## 🚀 Quick Setup Steps

### 1. Get Your Razorpay Keys

1. **Sign up/Login** at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. **Go to Settings** → **API Keys**
3. **Generate a new key pair** (if you don't have one)
4. **Copy your Key ID and Key Secret**

### 2. Update Frontend Configuration

Edit `frontend/src/config/razorpay.js`:

```javascript
export const RAZORPAY_CONFIG = {
  KEY_ID: 'rzp_test_YOUR_ACTUAL_KEY_ID_HERE', // Replace with your actual Key ID
  KEY_SECRET: 'YOUR_ACTUAL_SECRET_KEY_HERE', // This is for backend only
  STORE_NAME: 'Your Store Name',
  STORE_DESCRIPTION: 'Your Store Description',
  CURRENCY: 'INR',
  BACKEND_URL: 'http://localhost:5000'
};
```

### 3. Update Backend Environment Variables

Create/Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY_HERE
```

### 4. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🧪 Testing the Payment Integration

### Test Card Details
Use these test card details for testing:

- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

### Test Flow
1. **Login** to your account
2. **Go to a product page**
3. **Select a size**
4. **Click "BUY NOW"** or **"ADD TO CART"** then **"BUY NOW"**
5. **Complete payment** with test card details

## 🔍 Troubleshooting

### Common Issues:

1. **"Payment failed, please try again"**
   - Check if backend server is running on port 5000
   - Verify Razorpay keys are correct
   - Check browser console for errors

2. **"Failed to create order"**
   - Ensure backend is running
   - Check if Razorpay keys are properly set in backend .env
   - Verify network connectivity

3. **"Payment verification failed"**
   - Check if Key Secret is correct in backend .env
   - Ensure both frontend and backend keys match

### Debug Steps:

1. **Check Backend Logs:**
   ```bash
   cd backend
   npm run dev
   # Look for error messages in terminal
   ```

2. **Check Frontend Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages

3. **Test API Endpoints:**
   ```bash
   # Test order creation
   curl -X POST http://localhost:5001/api/payments/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 100, "currency": "INR"}'
   ```

## 📁 Files Modified/Created

### Frontend Files:
- `frontend/src/config/razorpay.js` - Configuration file
- `frontend/src/utils/razorpay.js` - Payment utilities
- `frontend/src/pages/ProductDetails.jsx` - Buy Now button
- `frontend/src/pages/ShoppingCart.jsx` - Cart checkout
- `frontend/src/context/ShopContext.jsx` - Cart and payment functions

### Backend Files:
- `backend/routes/paymentRoutes.js` - Payment API endpoints
- `backend/server.js` - Added payment routes
- `backend/.env` - Environment variables

## 🎯 Features Implemented

✅ **Size Selection Required** - Users must select size before adding to cart  
✅ **Cart Persistence** - Cart data saved to localStorage  
✅ **Buy Now Button** - Direct purchase on product pages  
✅ **Cart Checkout** - Buy all items in cart  
✅ **Payment Verification** - Backend signature verification  
✅ **Error Handling** - Comprehensive error messages  
✅ **Test Mode** - Ready for testing with test cards  

## 🚀 Production Deployment

For production:

1. **Replace test keys** with live keys from Razorpay
2. **Update BACKEND_URL** in frontend config to your production URL
3. **Set up proper environment variables** on your production server
4. **Enable HTTPS** (required for live payments)

## 📞 Support

If you're still having issues:

1. Check the browser console for specific error messages
2. Verify all keys are correctly copied (no extra spaces)
3. Ensure both frontend and backend servers are running
4. Test with the provided test card details

The integration is now complete and ready for testing! 🎉 