// import { useSelector, useDispatch } from "react-redux";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { clearCart } from "../redux/Slices/CartSlice"; // Ensure the path is correct
// import { useWishlist } from "../context/WishlistContext"; // Import wishlist context
// import axios from "axios";

// const Navbar = () => {
//   const { cart } = useSelector((state) => state.cart) || {}; // Ensure cart is safely fetched
//   const { wishlist } = useWishlist() || {}; // Ensure wishlist is safely fetched
//   const dispatch = useDispatch();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { clearUser, setUser } = useWishlist();

//   const checkLoginStatus = () => {
//     const authToken = localStorage.getItem("authToken");
//     const loginCookie = document.cookie.includes("authCookie");
//     const loggedIn = !!authToken || loginCookie;

//     if (loggedIn) {
//       const storedUserId = localStorage.getItem("userId");
//       if (storedUserId) {
//         setUser(storedUserId); // Load wishlist for the user
//       }
//     }
//     setIsLoggedIn(loggedIn);
//   };

//   useEffect(() => {
//     checkLoginStatus();

//     // Listen for storage changes from other tabs
//     window.addEventListener("storage", checkLoginStatus);

//     return () => {
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, [location]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("authToken");
// //     document.cookie = "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// //     clearUser();
// //     dispatch(clearCart());
// //     setIsLoggedIn(false);
// //     navigate("/login");
// //   };
// // // In your frontend, change the POST request to GET
// // // In your frontend, keep the POST request as is
// const handleLogout = async () => {
//   try {
//     // Get the token from localStorage
//     const token = localStorage.getItem("authToken");

//     // Get the wishlist from localStorage
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//     // Send logout request with wishlist in the request body
//     await axios.post(
//       "http://localhost:4000/user/logout",
//       { wishlist }, // Include wishlist in the body
//       {
//         headers: { Authorization: `Bearer ${token}` }, // Send token in the header
//         withCredentials: true, // Ensures cookies are sent and cleared
//       }
//     );

//     // Clear local storage and cookies after logout
//     localStorage.removeItem("wishlist");
//     localStorage.removeItem("authToken");
//     document.cookie =
//       "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     // Reset the logged-in state
//     setIsLoggedIn(false);

//     // Redirect to login page
//     navigate("/login");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };


//   return (
//     <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4 bg-slate-900 text-slate-100">
//       <NavLink to="/" className="flex items-center">
//         <img src="../logo.png" className="h-14" alt="Logo" />
//       </NavLink>

//       <div className="flex items-center font-medium space-x-6">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/wishlist">Wishlist</NavLink>
//         <NavLink to="/cart">
//           <div className="relative">
//             <FaShoppingCart className="text-2xl" />
//             {/* Ensure cart is an array and check length */}
//             {cart && cart.length > 0 && (
//               <span
//                 className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
//                 justify-center items-center animate-bounce rounded-full text-white"
//               >
//                 {cart.length}
//               </span>
//             )}
//           </div>
//         </NavLink>

//         {/* Wishlist Badge */}
//         {wishlist && wishlist.length > 0 && (
//           <NavLink to="/wishlist">
//             <div className="relative">
//               <span
//                 className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 flex 
//                 justify-center items-center animate-bounce rounded-full text-white"
//               >
//                 {wishlist.length}
//               </span>
//             </div>
//           </NavLink>
//         )}

//         {isLoggedIn ? (
//           <button onClick={handleLogout} className="text-red-500">
//             Logout
//           </button>
//         ) : (
//           <NavLink to="/signup">Signup</NavLink>
//         )}
//       </div>
//     </nav>
//   );
// };
//  export default Navbar;
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { clearCart } from "../redux/Slices/CartSlice"; // Ensure the path is correct
import { useWishlist } from "../context/WishlistContext"; // Import wishlist context
import axios from "axios";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart) || {}; // Ensure cart is safely fetched
  const { wishlist, setUser, clearUser } = useWishlist() || {}; // Ensure wishlist is safely fetched
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is logged in by checking localStorage or cookies
  const checkLoginStatus = () => {
    const authToken = localStorage.getItem("authToken");
    const loginCookie = document.cookie.includes("authCookie");
    const loggedIn = !!authToken || loginCookie;

    if (loggedIn) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUser(storedUserId); // Load wishlist for the user
      }
    }
    setIsLoggedIn(loggedIn);
  };

  // Effect to check login status on initial load and on location change (e.g., route change)
  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes (in case of login/logout in another tab)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location]);

  // Handle login
  const handleLogin = async (loginData) => {
    try {
      // Send the login request to the server (assuming POST request for login)
      const response = await axios.post("http://localhost:4000/user/login", loginData);

      // On successful login, store the auth token and user ID in localStorage
      const { authToken, userId } = response.data;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userId", userId);

      // Set the state for logged-in status and load the user data
      setIsLoggedIn(true);
      setUser(userId); // Set the user ID to load the wishlist

      // Redirect to the home page or dashboard
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

      // Send logout request with wishlist in the request body
      await axios.post(
        "http://localhost:4000/user/logout",
        { wishlist: wishlistData },
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in the header
          withCredentials: true, // Ensures cookies are sent and cleared
        }
      );

      // Clear local storage and cookies after logout
      localStorage.removeItem("wishlist");
      localStorage.removeItem("authToken");
      document.cookie =
        "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Reset the logged-in state
      setIsLoggedIn(false);
      clearUser(); // Clear the user wishlist data from context
      dispatch(clearCart()); // Clear the cart

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4 bg-slate-900 text-slate-100">
      <NavLink to="/" className="flex items-center">
        <img src="../logo.png" className="h-14" alt="Logo" />
      </NavLink>

      <div className="flex items-center font-medium space-x-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/cart">
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            {/* Ensure cart is an array and check length */}
            {cart && cart.length > 0 && (
              <span
                className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white"
              >
                {cart.length}
              </span>
            )}
          </div>
        </NavLink>

        {/* Wishlist Badge */}
        {wishlist && wishlist.length > 0 && (
          <NavLink to="/wishlist">
            <div className="relative">
              <span
                className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white"
              >
                {wishlist.length}
              </span>
            </div>
          </NavLink>
        )}

        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        ) : (
          <NavLink to="/signup">Signup</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
