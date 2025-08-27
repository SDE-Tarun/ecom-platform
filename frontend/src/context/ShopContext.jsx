import { createContext, useState, useContext, useEffect } from "react";
import productsData from "../components/FixedData";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; 

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const currency = "₹";
	const delivery_fee = 10;
    const [activeSearch, setActiveSearch] = useState(false);
    const [search, setSearch] = useState('');
	const [cart, setCart] = useState(() => {
		// Load cart from localStorage on initial load
		const savedCart = localStorage.getItem('cart');
		return savedCart ? JSON.parse(savedCart) : {};
	});
	const { user } = useAuth();

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	// Clear cart when user logs out
	useEffect(() => {
		if (!user) {
			setCart({});
			localStorage.removeItem('cart');
		}
	}, [user]);

	// 🔹 NEW: Add to cart (supports size; same item increments qty) - Only for logged in users
  const addToCart = (product, size = null) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to add products to cart!");
      return;
    }

    // Check if size is selected
    if (!size) {
      toast.error("Please select a size before adding to cart!");
      return;
    }

    const key = `${product._id}_${size}`;
    setCart((prev) => {
      const existing = prev[key];
      if (existing) {
        toast.info("Quantity updated in cart!");
        return { ...prev, [key]: { ...existing, qty: existing.qty + 1 } };
      }
      toast.success("Product added to cart!");
      return { ...prev, [key]: { id: product._id, size, qty: 1 } };
    });
  };

  // Add this function
const removeFromCart = (productId, size = null) => {
  // Check if user is logged in
  if (!user) {
    toast.error("Please login to manage your cart!");
    return;
  }

  const key = size ? `${productId}_${size}` : `${productId}`;
  setCart((prev) => {
    const newCart = { ...prev };
    delete newCart[key];
    toast.error("Product removed from cart!");
    return newCart;
  });
};

// New function to increase/decrease quantity
const updateQuantity = (productId, size = null, change = 1) => {
  // Check if user is logged in
  if (!user) {
    toast.error("Please login to manage your cart!");
    return;
  }

  const key = size ? `${productId}_${size}` : `${productId}`;
  setCart((prev) => {
    const newCart = { ...prev };
    if (!newCart[key]) return prev;

    const newQty = newCart[key].qty + change;

    if (newQty <= 0) {
      delete newCart[key]; // remove product if qty goes to 0
      toast.error("Product removed from cart!");
    } else {
      newCart[key].qty = newQty;
      toast.info("Quantity updated!");
    }
    return newCart;
  });
};

  // 🔹 NEW: Total items count for Navbar badge
  const getCartCount = () =>
    Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  // Calculate total cart value
  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => {
      const product = productsData.find(p => p._id === item.id);
      return total + (product ? product.price * item.qty : 0);
    }, 0);
  };

  // Buy Now function for cart
  const buyNow = async (cartItems) => {
    if (!user) {
      toast.error("Please login to make a purchase!");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      const totalAmount = getCartTotal();
      const orderData = {
        amount: totalAmount * 100, // Razorpay expects amount in paise
        currency: "INR",
        description: `Purchase of ${Object.keys(cartItems).length} items`,
        orderId: `order_${Date.now()}`,
        customerName: user.name || user.email,
        customerEmail: user.email,
        customerPhone: user.phone || ""
      };

      // Import and use Razorpay
      const { initializeRazorpay } = await import('../utils/razorpay');
      const response = await initializeRazorpay(orderData);
      
      if (response) {
        toast.success("Payment successful! Order placed.");
        // Clear cart after successful payment
        setCart({});
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

	const value = {
		productsData, currency, delivery_fee, search, setSearch, activeSearch, setActiveSearch, cart, addToCart, getCartCount, removeFromCart, updateQuantity, getCartTotal, buyNow
	};
	return (
		<ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
	);
};

export default ShopContextProvider;
