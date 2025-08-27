// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  // Replace these with your actual Razorpay keys
  // Get these from your Razorpay Dashboard: https://dashboard.razorpay.com/
  KEY_ID: 'rzp_test_RAG8SPuiBbBZXF', // Your Razorpay Key ID
  KEY_SECRET: 'v54cBvyEMYfMGc2KCwpcdj56%', // Your Razorpay Key Secret (backend only)
  
  // Store configuration
  STORE_NAME: 'Your Store Name',
  STORE_DESCRIPTION: 'Your Store Description',
  
  // Currency configuration
  CURRENCY: 'INR',
  
  // Backend API URL - Updated to port 5001
  BACKEND_URL: 'http://localhost:5001'
};

// Test card details for testing
export const TEST_CARD_DETAILS = {
  CARD_NUMBER: '4111 1111 1111 1111',
  EXPIRY: '12/25',
  CVV: '123',
  NAME: 'Test User'
}; 