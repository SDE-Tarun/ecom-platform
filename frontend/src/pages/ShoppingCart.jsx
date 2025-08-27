import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import HeaderDashed from "../components/HeaderDashed";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, productsData, currency, removeFromCart, updateQuantity, getCartTotal, buyNow } = useContext(ShopContext);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your cart!");
      navigate("/login");
    }
  }, [user, navigate]);

  // Cart me jo products add hain unki details nikalo
  const cartItems = Object.values(cart).map((item) => {
    const product = productsData.find((p) => p._id === item.id);
    return {
      ...product,
      qty: item.qty,
      size: item.size,
    };
  });

  // Don't render cart if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="shopping-cart container mt-5"
    >
      <HeaderDashed head1="Shopping" head2="Cart" />

      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <p className="fs-4 c-gray">Your cart is empty.</p>
          <Link to="/collection" className="btn bg-black c-white mt-3 px-4 py-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4 justify-content-center">
            {cartItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="col-12 col-sm-6 col-lg-4"
              >
                <div className="card border-0 shadow-sm h-100 d-flex flex-column justify-content-center align-items-center text-center">
                  {/* Delete Icon */}
                  <i
                    className="bx bx-x fs-4 position-absolute top-0 end-0 m-2 c-gray cursor"
                    onClick={() => removeFromCart(item._id, item.size)}
                    title="Remove"
                    role="button"
                  ></i>
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title">{item.name}</h5>
                    {item.size && (
                      <p className="mb-1">
                        <strong>Size:</strong> {item.size}
                      </p>
                    )}
                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center gap-2 my-2">
                      <button
                        className="btn btn-sm bg-light border"
                        onClick={() => updateQuantity(item._id, item.size, -1)}
                      >
                        −
                      </button>
                      <span className="fw-bold">{item.qty}</span>
                      <button
                        className="btn btn-sm bg-light border"
                        onClick={() => updateQuantity(item._id, item.size, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="fw-bold fs-5 mb-0">
                      {currency}
                      {item.price * item.qty}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Cart Summary and Buy Now Button */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Cart Total:</h5>
                    <h4 className="mb-0 fw-bold">{currency}{getCartTotal()}</h4>
                  </div>
                  <div className="d-flex gap-2">
                    <Link to="/collection" className="btn btn-outline-dark flex-fill">
                      Continue Shopping
                    </Link>
                    <button 
                      className="btn bg-success c-white flex-fill"
                      onClick={() => buyNow(cart)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default ShoppingCart;
