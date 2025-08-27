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
	const [cart, setCart] = useState({});
	const { user } = useAuth();

	// Clear cart when user logs out
	useEffect(() => {
		if (!user) {
			setCart({});
		}
	}, [user]);

	// 🔹 NEW: Add to cart (supports size; same item increments qty) - Only for logged in users
  const addToCart = (product, size = null) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to add products to cart!");
      return;
    }

    const key = size ? `${product._id}_${size}` : `${product._id}`;
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

	const value = {
		productsData, currency, delivery_fee, search, setSearch, activeSearch, setActiveSearch, cart, addToCart, getCartCount, removeFromCart, updateQuantity
	};
	return (
		<ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
	);
};

export default ShopContextProvider;
