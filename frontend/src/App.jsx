import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Importing styles and scripts
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "boxicons/css/boxicons.min.css";
import "./App.css";

// Importing pages and components
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import Loader from "./components/Loader";
import Signup from "./pages/Signup";

// Importing hooks and animations
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";

// React Toastify imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	// Get current location
	const location = useLocation();
	const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loading state on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loader delay

    return () => clearTimeout(timer);
  }, [location]);

	return (
		<div className="App">
			<Navbar />
			{loading ? (
        <Loader />
      ) : (
			<AnimatePresence>
				{/* Render routes with animations */}
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/admin-panel" element={<AdminPanel />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Signup />} />
					<Route path="/cart" element={<ShoppingCart />} />
					<Route path="/products/:productId" element={<ProductDetails />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
			)}
			<Footer />
			{/* React Toastify container */}
      <ToastContainer 
      position="bottom-right"
      autoClose={3000} // auto-close duration in ms
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover={false}
      />
		</div>
	);
}

export default App;
