import { RAZORPAY_CONFIG } from '../config/razorpay.js';

// Load Razorpay script
export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpay = async (orderData) => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
  if (!res) {
    alert('Razorpay SDK failed to load');
    return;
  }

  try {
    // Create order on backend
    const orderResponse = await fetch(`${RAZORPAY_CONFIG.BACKEND_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.amount / 100, // Convert from paise to rupees
        currency: orderData.currency,
        receipt: `receipt_${Date.now()}`
      }),
    });

    const orderResult = await orderResponse.json();
    
    if (!orderResult.success) {
      throw new Error('Failed to create order');
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: RAZORPAY_CONFIG.STORE_NAME,
        description: orderData.description,
        order_id: orderResult.order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(`${RAZORPAY_CONFIG.BACKEND_URL}/api/payments/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              console.log('Payment verified successfully:', verifyResult);
              resolve(verifyResult);
            } else {
              reject(new Error('Payment verification failed'));
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            reject(error);
          }
        },
        prefill: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          contact: orderData.customerPhone || ''
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}; 