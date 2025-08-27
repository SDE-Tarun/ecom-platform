// Test script to verify Razorpay integration
import { RAZORPAY_CONFIG } from '../config/razorpay.js';

export const testRazorpayConnection = async () => {
  try {
    console.log('🧪 Testing Razorpay connection...');
    console.log('🔑 Key ID:', RAZORPAY_CONFIG.KEY_ID);
    console.log('🌐 Backend URL:', RAZORPAY_CONFIG.BACKEND_URL);
    
    // First test if backend is reachable
    console.log('📡 Testing backend connectivity...');
    const testResponse = await fetch(`${RAZORPAY_CONFIG.BACKEND_URL}/api/payments/test`);
    
    if (!testResponse.ok) {
      throw new Error(`Backend not reachable: ${testResponse.status}`);
    }
    
    const testResult = await testResponse.json();
    console.log('✅ Backend is reachable:', testResult.message);
    console.log('🔧 Razorpay key status:', testResult.razorpay_key);
    
    // Test order creation
    console.log('🛒 Testing order creation...');
    const orderResponse = await fetch(`${RAZORPAY_CONFIG.BACKEND_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100, // 1 rupee
        currency: 'INR',
        receipt: `test_${Date.now()}`
      }),
    });

    const orderResult = await orderResponse.json();
    
    if (orderResult.success) {
      console.log('✅ Order creation successful!');
      console.log('📋 Order ID:', orderResult.order.id);
      return true;
    } else {
      console.error('❌ Order creation failed:', orderResult.error);
      if (orderResult.details) {
        console.error('📝 Details:', orderResult.details);
      }
      return false;
    }
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error('💡 Make sure your backend server is running on port 5000');
    }
    return false;
  }
};

// Run test when imported
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(() => {
    testRazorpayConnection();
  }, 1000);
} 