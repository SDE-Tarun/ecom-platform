import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Payment API is working!',
    timestamp: new Date().toISOString(),
    razorpay_key: process.env.RAZORPAY_KEY_ID ? 'Configured' : 'Not configured',
    razorpay_secret: process.env.RAZORPAY_KEY_SECRET ? 'Configured' : 'Not configured'
  });
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    console.log('📝 Creating order with data:', req.body);
    console.log('🔍 Environment Variables Debug:');
    console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
    console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '***configured***' : 'NOT CONFIGURED');
    
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        error: 'Amount is required'
      });
    }

    // Initialize Razorpay inside the route handler
    let razorpay;
    try {
      razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_SECRET_KEY_HERE'
      });
      console.log('✅ Razorpay initialized successfully');
      console.log('🔑 Key ID:', process.env.RAZORPAY_KEY_ID ? 'Configured' : 'Not configured');
      console.log('🔐 Key Secret:', process.env.RAZORPAY_KEY_SECRET ? 'Configured' : 'Not configured');
    } catch (error) {
      console.error('❌ Failed to initialize Razorpay:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to initialize Razorpay',
        details: error.message
      });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    console.log('🛒 Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);
    
    console.log('✅ Order created successfully:', order.id);
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      description: error.description
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      details: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_SECRET_KEY_HERE')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified
      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment'
    });
  }
});

export default router; 