import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // For Hamburger Menu
import { clearCart } from "../redux/Slices/CartSlice";
import { useWishlist } from "../context/WishlistContext";
import axios from "axios";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart) || {};
  const { wishlist, setUser, clearUser } = useWishlist() || {};
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const checkLoginStatus = () => {
    const authToken = localStorage.getItem("authToken");
    const loginCookie = document.cookie.includes("authCookie");
    const loggedIn = !!authToken || loginCookie;

    if (loggedIn) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUser(storedUserId);
      }
    }
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location]);

  const handleLogout = async () => {
    try {
      const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
      await axios.post(
        "http://localhost:4000/user/logout",
        { wishlist: wishlistData },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("wishlist");
      localStorage.removeItem("authToken");
      document.cookie =
        "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      clearUser();
      dispatch(clearCart());
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-900 text-slate-100">
  <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-20">
    {/* Logo */}
    <NavLink to="/" className="flex items-center">
    <img src="../logo.png" className="h-10 sm:h-14 " alt="Logo" />
    </NavLink>

    {/* Desktop Menu */}
    <div className="hidden sm:flex items-center space-x-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
      <NavLink to="/cart">
        <div className="relative">
          <FaShoppingCart className="text-2xl" />
          {cart && cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
              {cart.length}
            </span>
          )}
        </div>
      </NavLink>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button>
      ) : (
        <NavLink to="/signup">Signup</NavLink>
      )}
    </div>

    {/* Mobile Hamburger Menu */}
    <div className="sm:hidden flex items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl focus:outline-none"
      >
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
  <div className="sm:hidden bg-slate-800 text-slate-100 flex flex-col items-start space-y-4 py-4 px-4">
    {/* Home Link */}
    <NavLink to="/" onClick={() => setMenuOpen(false)} className="w-full">
      Home
    </NavLink>

    {/* Wishlist Link */}
    <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="w-full">
      Wishlist
    </NavLink>

    {/* Cart Link */}
    <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="w-full">
      <div className="relative flex items-center">
        <FaShoppingCart className="text-2xl" />
        {cart && cart.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
            {cart.length}
          </span>
        )}
      </div>
    </NavLink>

    {/* Logout/Signup */}
    {isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="text-red-500 w-full text-left"
      >
        Logout
      </button>
    ) : (
      <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="w-full">
        Signup
      </NavLink>
    )}
  </div>
)}

</nav>

  );
};

export default Navbar;
