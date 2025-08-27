# 🚀 Quick Setup Guide - Fix Payment Issues

## ❌ Current Issues:
1. **CORS Error** - Backend server not running properly
2. **Razorpay Keys** - Still using placeholder keys

## ✅ Fix Steps:

### Step 1: Update Your Razorpay Keys

**Edit `frontend/src/config/razorpay.js`:**
```javascript
export const RAZORPAY_CONFIG = {
  KEY_ID: 'rzp_test_YOUR_ACTUAL_KEY_ID_HERE', // ⚠️ REPLACE THIS
  KEY_SECRET: 'YOUR_ACTUAL_SECRET_KEY_HERE', // ⚠️ REPLACE THIS
  STORE_NAME: 'Your Store Name',
  STORE_DESCRIPTION: 'Your Store Description',
  CURRENCY: 'INR',
  BACKEND_URL: 'http://localhost:5000'
};
```

**Create `backend/.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY_HERE
```

### Step 2: Get Your Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Login to your account
3. Go to **Settings** → **API Keys**
4. Click **Generate Key Pair** (if you don't have one)
5. Copy the **Key ID** and **Key Secret**

### Step 3: Start Both Servers

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

### Step 4: Test the Connection

1. Open browser DevTools (F12)
2. Go to Console tab
3. Refresh the page
4. Look for: "✅ Backend connection successful!"

### Step 5: Test Payment

1. Login to your account
2. Go to any product page
3. Select a size
4. Click "BUY NOW"
5. Use test card: `4111 1111 1111 1111`

## 🔍 Troubleshooting:

**If you still get CORS error:**
- Make sure backend is running on port 5000
- Check if you see "Server running on 5000" in backend terminal

**If you get "Failed to create order":**
- Check your Razorpay keys are correct
- Make sure keys start with `rzp_test_` for test mode

**If payment still fails:**
- Check browser console for specific error messages
- Verify both frontend and backend keys match

## 📞 Need Help?

1. Check browser console for error messages
2. Verify your Razorpay keys are correctly copied
3. Ensure both servers are running
4. Test with the provided test card details

The payment integration will work once you update the keys! 🎉 